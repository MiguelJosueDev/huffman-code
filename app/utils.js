export const getFrequencies = (text) => {
    const frequencies = {};

    text.split('').forEach(char => {
        if (frequencies[char]) {
            frequencies[char] += 1;
        } else {
            frequencies[char] = 1;
        }
    });
    return frequencies;
};

export const buildHuffmanTree = (frequencies) => {
    const nodes = Object.entries(frequencies).map(([char, freq]) => ({ char, freq, left: null, right: null }));
    nodes.sort((a, b) => a.freq - b.freq);

    while (nodes.length > 1) {
        const leftNode = nodes.shift();
        const rightNode = nodes.shift();
        const newNode = {
            char: leftNode.char + rightNode.char,
            freq: leftNode.freq + rightNode.freq,
            left: leftNode,
            right: rightNode,
        };
        nodes.push(newNode);
        nodes.sort((a, b) => a.freq - b.freq);
    }

    return nodes[0];
};

export const buildCodes = (node, currentCode = "", codes = {}) => {
    if (!node.left && !node.right) {
        codes[node.char] = currentCode;
        return codes;
    }
    if (node.left) buildCodes(node.left, currentCode + "0", codes);
    if (node.right) buildCodes(node.right, currentCode + "1", codes);
    return codes;
};

export const encodeText = (text, codes) => text.split('').map(char => codes[char]).join("");

export const decodeText = (text, huffmanTree) => {
    let decodedText = "";
    let currentNode = huffmanTree;
    for (let i = 0; i < text.length; i++) {
        if (text[i] === "0") {
            currentNode = currentNode.left;
        } else {
            currentNode = currentNode.right;
        }
        if (!currentNode.left && !currentNode.right) {
            decodedText += currentNode.char;
            currentNode = huffmanTree;
        }
    }
    return decodedText;
};

export const compressFile = (inputFile, callback) => {
    const reader = new FileReader();

    reader.onload = () => {
        const text = reader.result;
        const frequencies = getFrequencies(text);
        const huffmanTree = buildHuffmanTree(frequencies);
        const codes = buildCodes(huffmanTree);
        const encodedText = encodeText(text, codes);

        const compressedData = JSON.stringify({ encodedText, codes });

        const blob = new Blob([compressedData], { type: 'application/json' });
        callback(blob);
    };

    reader.readAsText(inputFile);
};

export const decompressFile = (inputFile, callback) => {
    const reader = new FileReader();

    reader.onload = () => {
        const compressedData = JSON.parse(reader.result);
        const { encodedText, codes } = compressedData;

        const frequencies = getFrequencies(Object.keys(codes).join(''));
        const huffmanTree = buildHuffmanTree(frequencies);
        const decodedText = decodeText(encodedText, huffmanTree);

        const blob = new Blob([decodedText], { type: 'text/plain' });
        callback(blob);
    };

    reader.readAsText(inputFile);
};
