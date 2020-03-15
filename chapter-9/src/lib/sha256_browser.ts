const sha256_browser = async (data: string) : Promise<string> => {
    const msgUint8Array = new TextEncoder().encode(data);
 
    const hashByteArray = await crypto.subtle.digest('SHA-256',
    msgUint8Array);
 
    const hashArray = Array.from(new Uint8Array(hashByteArray));
 
    const hashHex = hashArray.map(b => ('00' + 
                        b.toString(16)).slice(-2)).join('');
    return hashHex;
}

export default sha256_browser