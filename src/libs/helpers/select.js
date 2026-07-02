import readline from "node:readline";
import { options } from "../constant/options.js";

export const select = async (title, _options) => {
  return new Promise((resolve) => {
    const rowCount = _options.length + 1;
    let selected = 0;

    function render() {
      if (render.hasRendered) {
        // Yukarı çık.
        readline.moveCursor(process.stdout, 0, -_options.length - 1);

        // Yazılan satırları temizle.
        for (let i = 0; i < rowCount; i++) {
          readline.clearLine(process.stdout, 0);
          readline.moveCursor(process.stdout, 0, 1);
        }

        // Tekrar yukarı dön.
        readline.moveCursor(process.stdout, 0, -(_options.length + 1));
      }

      console.log(title);

      _options.forEach((option, index) => {
        console.log(index === selected ? `❯ ${option}` : `  ${option}`);
      });

      render.hasRendered = true;
    }

    render.hasRendered = false;
    render();

    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.setEncoding("utf8");

    function onData(key) {
      // Yukarı Ok
      if (key === "\u001B[A") {
        selected = (selected - 1 + _options.length) % _options.length;

        render();
      }

      // Aşağı Ok
      if (key === "\u001B[B") {
        selected = (selected + 1) % _options.length;
        render();
      }

      // Enter
      if (key === "\r") {
        process.stdin.off("data", onData);
        process.stdin.setRawMode(false);
        process.stdin.pause();

        resolve(options[_options[selected]]);
      }

      // Ctrl + C
      if (key === "\u0003") process.exit();
    }

    // Kalvye girdilerini takip eder. (Klavyeden her hangi bir giriş olması yeterli.)
    process.stdin.on("data", onData);
  });
};
