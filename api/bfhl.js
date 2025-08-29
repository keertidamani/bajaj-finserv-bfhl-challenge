export default function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const USER_ID = "keerti_damani_15042003";
  const EMAIL = "keerti.damani2021@vitstudent.ac.in";
  const ROLL_NUMBER = "21BCE0987";

  if (req.method === 'POST') {
    try {
      const { data } = req.body;

      if (!data || !Array.isArray(data)) {
        return res.status(400).json({
          is_success: false,
          message: "Invalid input"
        });
      }

      const numbers = [];
      const alphabets = [];
      let highestLowercaseAlphabet = [];

      data.forEach(item => {
        const str = String(item);
        
        if (!isNaN(str) && !isNaN(parseFloat(str))) {
          numbers.push(str);
        }
        else if (str.length === 1 && /^[a-zA-Z]$/.test(str)) {
          alphabets.push(str);
          
          if (str >= 'a' && str <= 'z') {
            if (highestLowercaseAlphabet.length === 0 || str > highestLowercaseAlphabet[0]) {
              highestLowercaseAlphabet = [str];
            }
          }
        }
      });

      return res.status(200).json({
        is_success: true,
        user_id: USER_ID,
        email: EMAIL,
        roll_number: ROLL_NUMBER,
        numbers: numbers,
        alphabets: alphabets,
        highest_lowercase_alphabet: highestLowercaseAlphabet
      });

    } catch (error) {
      return res.status(500).json({
        is_success: false,
        message: "Internal server error"
      });
    }
  }
  
  else if (req.method === 'GET') {
    return res.status(200).json({
      operation_code: 1
    });
  }
  
  else {
    return res.status(405).json({
      message: "Method not allowed"
    });
  }
}
