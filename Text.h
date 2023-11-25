#ifndef TEXT_H
#define TEXT_H

#include <Adafruit_NeoMatrix.h>

#include "Colors.h"

int textSpeed = 60;                // Default speed
uint32_t textColor = WHITE;        // Default color
String text = "*.*. LuciFi .*.*";  // Default text

void scrollText(Adafruit_NeoMatrix* matrix, String text) {
  matrix->setTextColor(textColor);  // Set the text color
  matrix->fillScreen(0);
  int startX = matrix->width();
  int len = text.length() * 6;  // Approx width of a character
  for (int x = startX; x > -len; x--) {
    matrix->fillScreen(0);
    matrix->setCursor(x, 0);
    matrix->print(text);
    matrix->show();
    delay(100 - textSpeed);
  }
}

void waveText(Adafruit_NeoMatrix* matrix, String text) {
  matrix->setTextColor(textColor);  // Set the text color
  int textWidth =
      6 * strlen(text.c_str());  // 6 is an approx width of a character
  for (int x = 0; x < matrix->width() + textWidth; x++) {
    int y = 4 + sin(x / 2.0) * 4;  // Sine wave for vertical position
    matrix->fillScreen(0);         // Clear the matrix
    matrix->setCursor(matrix->width() - x, y);  // Set start position
    matrix->print(text);                        // Print the text
    matrix->show();                             // Show on the matrix
    delay(100 - textSpeed);                     // Delay for scrolling speed
  }
}
void blinkText(Adafruit_NeoMatrix* matrix, String text) {
  int startX = matrix->width();
  int len = text.length() * 6;  // Approx width of a character
  bool isVisible = true;        // To toggle visibility
  for (int x = startX; x > -len; x--) {
    matrix->fillScreen(0);
    matrix->setCursor(x, 0);
    if (isVisible) {
      matrix->print(text);
    }
    matrix->show();
    delay(100 - textSpeed);
    isVisible = !isVisible;  // Toggle the visibility
  }
}
void rainbowText(Adafruit_NeoMatrix* matrix, String text) {
  int startX = matrix->width();
  int len = text.length() * 6;  // Approx width of a character
  int hue = 0;
  for (int x = startX; x > -len; x--) {
    matrix->fillScreen(0);
    matrix->setCursor(x, 0);
    // Use HSV to cycle through colors
    matrix->setTextColor(matrix->ColorHSV(hue));
    matrix->print(text);
    matrix->show();
    delay(100 - textSpeed);  // Adjust speed based on your preference
    hue += textSpeed;
    // Adjust the hue increment for a faster/slower color change
  }
}
#endif
