export default function setInputFilter(textbox, inputFilter) {
  if (inputFilter(textbox.value)) {
    textbox.oldValue = textbox.value;
    textbox.oldSelectionStart = textbox.selectionStart;
    textbox.oldSelectionEnd = textbox.selectionEnd;
  } else if (textbox.hasOwnProperty("oldValue")) {
    textbox.value = textbox.oldValue;
    textbox.setSelectionRange(
      textbox.oldSelectionStart, textbox.oldSelectionEnd
    );
  }
}
