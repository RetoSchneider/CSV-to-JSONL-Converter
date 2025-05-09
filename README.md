# CSV-to-JSONL Converter

## 🚀 Features

- **Drag & Drop Interface**: Easily upload CSV files with a simple drag and drop
- **Instant Token Counting**: See the total tokens in your dataset immediately
- **OpenAI-Ready Format**: Get properly formatted JSONL files ready for AI fine-tuning
- **100% Browser-Based**: All processing happens in your browser, with no data sent to any server
- **Privacy-Focused**: Your data never leaves your computer
- **Responsive Design**: Works on desktop and mobile devices
- **Dark Retro Theme**: Enjoy the synthwave-inspired interface while converting your files
- **Estimated Cost Calculator**: See approximate OpenAI API costs based on token count

## 🔧 Technology

Built with a modern tech stack:

- **React** - Frontend UI library
- **Vite** - Next-generation frontend tooling
- **Tailwind CSS** - For styling
- **PapaParse** - For CSV parsing
- **tiktoken-wasm** - WebAssembly version of OpenAI's tokenizer for accurate token counting

## 🛠️ Usage

1. Visit [https://csv-to-jsonl-converter.vercel.app/]
2. Drag & drop your CSV file onto the designated area (or click to browse files)
3. Wait a moment for the file to be processed
4. Review the token count and sample preview
5. Click "Download JSONL" to save the converted file
6. Use the JSONL file with OpenAI's API or other AI services

## 💡 Why JSONL for AI?

JSONL (JSON Lines) is a format where each line is a valid JSON object. Unlike regular JSON:

- Each record exists on its own line
- Records can be processed one at a time (streaming)
- The format is perfect for training data where each example should be distinct
- OpenAI requires JSONL format for fine-tuning datasets

## 🖥️ Local Development

To run this project locally:

```bash
# Clone the repository
git clone https://github.com/RetoSchneider/CSV-to-JSONL-Converter.git

# Navigate into the project directory
cd CSV-to-JSONL-Converter

# Install dependencies
npm install

# Start the development server
npm run dev
```

## 📄 License

MIT License - feel free to use and modify for your own projects.

## 🙏 Support

If you find this tool useful, consider:

- ⭐ Starring the repository on GitHub
- ☕ [Buying me a coffee](https://www.buymeacoffee.com/thyson)
- 💌 Sharing it with others who might find it helpful

## 🛡️ Privacy

This application processes all data locally in your browser. Your files are never uploaded to any server, ensuring complete privacy.

---

Made with ❤️ by [Reto Schneider](https://github.com/RetoSchneider)
