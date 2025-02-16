export async function getAccessToken() {
    const clientId = '9e33dbe1-a340-44ec-b272-3288be7bfa12';
    const secret = 'VMdF1nTOk0a2JZXXyDjMLxHgofOm5VKbYzFZeFwr';
    const url = "https://www.warcraftlogs.com/oauth/token";

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Authorization": "Basic " + btoa(`${clientId}:${secret}`),
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "grant_type=client_credentials"
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const json = await response.json();
    return json.access_token;
}