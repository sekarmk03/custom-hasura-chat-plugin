const objectParser = (query) => {
    const match = query.match(/objects:\s*({.*?})/s);
  
    let jsonObject = null;
    
    if (match) {
        const jsonString = match[1]
          .replace(/(\w+):/g, '"$1":')  // Convert keys to valid JSON format
          .replace(/"/g, '\"');        // Ensure correct escaping

        jsonObject = JSON.parse(jsonString);
    } else {
        console.log("No JSON object found.");
    }
}

module.exports = objectParser;