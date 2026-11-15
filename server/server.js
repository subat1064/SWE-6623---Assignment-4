require("dotenv").config();

const http = require("http");
const { URL } = require("url");

const PORT = 3000;
async function getEbayAccessToken() {
    const clientId = process.env.EBAY_CLIENT_ID;
    const clientSecret = process.env.EBAY_CLIENT_SECRET;

    const credentials = Buffer.from(
        `${clientId}:${clientSecret}`
    ).toString("base64");

    const response = await fetch(
        "https://api.sandbox.ebay.com/identity/v1/oauth2/token",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": `Basic ${credentials}`
            },
            body: new URLSearchParams({
                grant_type: "client_credentials",
                scope: "https://api.ebay.com/oauth/api_scope"
            })
        }
    );

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`eBay authentication failed: ${error}`);
    }

    const data = await response.json();
    return data.access_token;
}
const server = http.createServer(async (req, res) => {
    // Allow the Giftlinq browser app to communicate with this server.
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json");

    const requestUrl = new URL(req.url, `http://${req.headers.host}`);

    // Basic server check.
    if (requestUrl.pathname === "/") {
        res.writeHead(200);
        res.end(JSON.stringify({
            message: "Giftlinq eBay API server is running"
        }));
        return;
    }

    // Giftlinq eBay search endpoint.
    if (requestUrl.pathname === "/api/ebay/search") {
        const query = requestUrl.searchParams.get("q");

        if (!query) {
            res.writeHead(400);
            res.end(JSON.stringify({
                error: "A search query is required."
            }));
            return;
        }

      // Get an eBay access token and search for products.
try {
    const accessToken = await getEbayAccessToken();

    const ebayUrl =
        `https://api.sandbox.ebay.com/buy/browse/v1/item_summary/search?q=${encodeURIComponent(query)}&limit=10`;

    const ebayResponse = await fetch(ebayUrl, {
        headers: {
            "Authorization": `Bearer ${accessToken}`,
            "X-EBAY-C-MARKETPLACE-ID": "EBAY_US"
        }
    });

    if (!ebayResponse.ok) {
        const error = await ebayResponse.text();
        throw new Error(`eBay search failed: ${error}`);
    }

    const data = await ebayResponse.json();

    res.writeHead(200);
    res.end(JSON.stringify(data));
    return;

} catch (error) {
    console.error(error);

    res.writeHead(500);
    res.end(JSON.stringify({
        error: "Unable to search eBay.",
        details: error.message
    }));
    return;
}
    }

    res.writeHead(404);
    res.end(JSON.stringify({
        error: "Route not found."
    }));
});

server.listen(PORT, () => {
    console.log(`Giftlinq server running at http://localhost:${PORT}`);
});