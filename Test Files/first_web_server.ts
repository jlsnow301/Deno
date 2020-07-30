import defaultServer from "./my_server.ts";

for await (const request of defaultServer) {
  if (
    request.method === "POST" &&
    request.url === `/store-message` &&
    request.contentLength
  ) {
    const buffer = new Uint8Array(request.contentLength);
    let totalBytesRead = 0;

    while (true) {
      const bytesRead = await request.body.read(buffer);
      if (bytesRead === null) {
        break;
      }
      totalBytesRead += bytesRead;
      if (totalBytesRead >= request.contentLength) {
        break;
      }
    }

    await Deno.writeFile(`user-message.txt`, buffer);
    const decoder = new TextDecoder();
    const data = decoder.decode(buffer);
    console.log(data);

    const headers = new Headers();
    headers.set(`Location`, "/confirm");
    request.respond({ headers: headers, status: 303 });
  } else {
    console.log(request.method);
    console.log(request.url);

    const headers = new Headers();
    headers.set("Content-Type", "text/html");

    const body = `
    <h2>Our First app</h2>
    <form action="/store-message" method="POST">
        <input type="text" name="message">
        <button type="submit">Submit</button>
    </form>
    `;
    request.respond({ body: body, headers: headers });
  }
}
