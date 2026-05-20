export default async function handler(req, res) {
    // Cho phép giao diện web gọi vào hàm này
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    const { url } = req.query;
    if (!url) {
        return res.status(400).json({ error: 'Thiếu tham số url' });
    }

    try {
        // Gọi thử link ngắn và chặn không cho tự động chuyển hướng để bắt lấy link gốc
        const response = await fetch(url, {
            method: 'GET',
            redirect: 'manual'
        });
        
        const redirectUrl = response.headers.get('location');
        return res.status(200).json({ redirectUrl: redirectUrl || url });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}