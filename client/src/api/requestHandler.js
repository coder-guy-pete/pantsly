export const requestHandler = async (url, method, options, data) => {
    const response = await fetch(url, {
      method: method,
      ...options,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return await response.json();
  };

