function parseBuffer(buffer: Uint8Array) {
  const decoder = new TextDecoder();
  const decodedContent = decoder.decode(buffer);
  return decodedContent;
}

const inputBuffer = new Uint8Array(1024);

let bytesRead = await Deno.stdin.read(inputBuffer);

if (bytesRead === null) {
  bytesRead = 0;
}
const content = parseBuffer(inputBuffer.subarray(0, bytesRead));
console.log(content);

try {
  await Deno.writeFile(`user-input.txt`, inputBuffer, { create: false });
} catch (err) {
  console.log(`File user-input.txt does not exist - please create it first!`);
}

console.log(`Done!`);
