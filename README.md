# Tokenizer AI

An **interactive tokenizer playground** built with **Next.js**, **TypeScript**, and a sleek UI for experimenting with **text tokenization** (encoding & decoding).  
Perfect for learning how tokenizers work under the hood and testing your own text data.

![Home Screenshot](https://raw.githubusercontent.com/mnraza-dev/tokenizer-ai/main/public/screenshots/home.jpg)
---
## 📺 Live Demo

Check out the live app here: [https://tokenizer-ai.vercel.app/](https://tokenizer-ai.vercel.app/)

---

## 🚀 Features

- **Encode** plain text into tokens  
- **Decode** tokens back into text  
- **Interactive UI** for real-time experimentation  
- **Custom vocabulary support**  
- **Fast & efficient** processing using modern JavaScript tokenization techniques  
- Built with **Next.js 15 + TypeScript**  
- **Dark/Light theme** support with persistent storage

---

## 📦 Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS + custom styles
- **Font:** Inter (Google Fonts)
- **State Management:** React hooks
- **Deployment:** Vercel

---

## ⚙️ Installation

### 1️⃣ Clone the repository

```bash
git clone https://github.com/mnraza-dev/tokenizer-ai.git

cd tokenizer-ai

pnpm install

pnpm dev
```

## 🛠 Usage
- Enter text in the "Encode" input box to see how it gets tokenized.

- Modify tokens in the "Decode" section to see how they reconstruct into text.

- Switch between Light/Dark mode for a better viewing experience.

- Experiment with different text lengths to observe token count changes.

## 📖 Example
Encoding Example

```yaml
Input: "Hello AI"
Output Tokens: [15496, 306, 1037]
```
Decoding Example

```yaml
Input Tokens: [15496, 306, 1037]
Output: "Hello AI"
```
## 📂 Project Structure
```bash
custom-tokenizer/
├── app/
│   ├── layout.tsx       # Root layout 
│   ├── page.tsx         # Main UI 
├── components/
│   ├── theme-provider.tsx
│   ├── tokenizer-ui.tsx
├── public/
│   └── favicon.ico
├── styles/
│   └── globals.css
└── README.md
```
## 📷 Screenshots

![Home Screenshot](https://raw.githubusercontent.com/mnraza-dev/tokenizer-ai/main/public/screenshots/home.jpg)

![Encode Screenshot](https://raw.githubusercontent.com/mnraza-dev/tokenizer-ai/main/public/screenshots/encode.jpg)
![Decode Screenshot](https://raw.githubusercontent.com/mnraza-dev/tokenizer-ai/main/public/screenshots/decode.jpg)

![Vocab Screenshot](https://raw.githubusercontent.com/mnraza-dev/tokenizer-ai/main/public/screenshots/vocab.jpg)

