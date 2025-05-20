module.exports = ({ config }) => {
    // Nếu lỗi thì thay giá trị này bằng IP của máy bạn (gõ ipconfig trong cmd và lấy IPv4)
    const IP_LOCAL = process.env.IP_LOCAL || "192.168.1.7"; 
    
    if (!IP_LOCAL) {
      throw new Error("Missing IP_LOCAL in environment variables");
    }
  
    return {
      ...config,
      extra: {
        IP_LOCAL,
      },
    };
};