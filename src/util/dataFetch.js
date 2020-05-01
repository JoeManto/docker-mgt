export const BASIC_HEADER = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

export async function apiFetch(method,endPoint,body,header = BASIC_HEADER) {
      let response = await fetch(endPoint,
        {
              method: method,
              headers: header,
              body: JSON.stringify(body),
        });

        const content = await response.json();

        if (response.status !== 200) {
            return false;
        }
        return content;
}