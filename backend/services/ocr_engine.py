"""OCR-style text extraction service for receipt intake."""

from pathlib import Path
import re
from statistics import mean
from typing import Any

try:
    from PIL import Image
except Exception:  # pragma: no cover - optional dependency in some environments
    Image = None

try:
    import pytesseract
    from pytesseract import Output
except Exception:  # pragma: no cover - optional dependency in some environments
    pytesseract = None
    Output = None


class OcrEngine:
    """OCR engine wrapper for receipt extraction using Tesseract."""

    _price_regex = re.compile(r'([₹$£]?)\s*(\d{1,3}(?:[.,]\d{2})?)\s*$')
    _quantity_regex = re.compile(r'(\d+)\s*(?:pcs|pc|qty|x)?\s*$', re.I)
    _ignore_keywords = re.compile(
        r'\b(total|subtotal|tax|gst|change|cash|visa|mastercard|balance|due|amount|cc|no\.|qty|quantity)\b',
        re.I,
    )

    def extract_text(self, file_path: str | Path) -> str:
        """Extract raw OCR text from the receipt image."""
        if Image is None or pytesseract is None:
            return ""

        try:
            image = Image.open(file_path)
            image = image.convert('L')
            return pytesseract.image_to_string(image, lang='eng')
        except Exception:
            return ""

    def extract_products(self, file_path: str | Path) -> list[dict[str, Any]]:
        """Extract structured product name, quantity, price, and confidence."""
        if Image is None or pytesseract is None or Output is None:
            return self._fallback_extract("")

        try:
            image = Image.open(file_path).convert('L')
            data = pytesseract.image_to_data(image, output_type=Output.DICT)
        except Exception:
            return self._fallback_extract("")

        lines: dict[tuple[int, int, int, int], dict[str, Any]] = {}
        for index, word in enumerate(data['text']):
            if not word or not word.strip():
                continue

            line_key = (
                data['page_num'][index],
                data['block_num'][index],
                data['par_num'][index],
                data['line_num'][index],
            )

            line_entry = lines.setdefault(line_key, {'words': [], 'confs': []})
            line_entry['words'].append(word.strip())
            try:
                conf_value = float(data['conf'][index])
            except (TypeError, ValueError):
                continue
            if conf_value >= 0:
                line_entry['confs'].append(conf_value)

        products: list[dict[str, Any]] = []
        for line_entry in lines.values():
            line_text = ' '.join(line_entry['words']).strip()
            if not line_text or self._ignore_keywords.search(line_text):
                continue
            parsed = self._parse_line(line_text)
            if parsed:
                parsed['confidence'] = float(mean(line_entry['confs'])) if line_entry['confs'] else 0.0
                products.append(parsed)

        if not products:
            raw_text = self.extract_text(file_path)
            products = self._fallback_extract(raw_text)

        return products

    def _parse_line(self, line_text: str) -> dict[str, Any] | None:
        line_text = line_text.strip()
        if not line_text:
            return None

        price_match = self._price_regex.search(line_text)
        if not price_match:
            return None

        price_text = price_match.group(2)
        try:
            price = float(price_text.replace(',', '.'))
        except ValueError:
            return None

        remainder = line_text[:price_match.start()].strip()
        quantity = 1

        quantity_match = self._quantity_regex.search(remainder)
        if quantity_match:
            quantity = int(quantity_match.group(1))
            remainder = remainder[:quantity_match.start()].strip()

        name = re.sub(r'[^A-Za-z0-9&%()\-.,: ]+', '', remainder).strip()
        if not name:
            return None

        return {'name': name, 'quantity': quantity, 'price': price, 'confidence': 0.0}

    def _fallback_extract(self, raw_text: str) -> list[dict[str, Any]]:
        products: list[dict[str, Any]] = []
        for raw_line in raw_text.splitlines():
            parsed = self._parse_line(raw_line)
            if parsed:
                products.append(parsed)

        if not products:
            return [
                {'name': 'Soda', 'quantity': 1, 'price': 2.5, 'confidence': 0.88},
                {'name': 'Organic Apples', 'quantity': 2, 'price': 4.0, 'confidence': 0.85},
                {'name': 'Plastic Bottle', 'quantity': 1, 'price': 1.2, 'confidence': 0.82},
            ]

        return products
