export const getWidth = (value, default_value, default_width) => default_width + String(value ?? default_value).length * (9 + default_width);

export const getMask = (values) => {
    let mask = 0;
    for (const value of values) mask |= 1 << value;
    return mask;
};

export const normText = (text) =>
    text
        .toLowerCase()
        .replace(/[^a-zа-яё0-9]/g, ' ')
        .split(' ')
        .filter((t) => t)
        .join(' ');


export function copyPaste(e) {
    let text = (e.clipboardData || window.DataTransfer).getData('text/plain');
    document.execCommand('insertText', false, text);
}

export function pasteToEnd(text) {
    document.execCommand('insertText', false, text);
}

export function isClick(window) {
    let selection = window.getSelection();
    if (!selection) return true;
    try {
        let range = selection.getRangeAt(0);
        return range.startOffset == range.endOffset;
    } catch (err) {
        console.log(err.message);
        return true;
    }
}