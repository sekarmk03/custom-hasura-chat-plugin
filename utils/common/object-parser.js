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

    /*From this string: "mutation SendMessage {\n  insertChatMessages(objects: {chatId: \"1\", content: \"halloo\"}) {\n    returning {\n      id\n      senderId\n      content\n    }\n  }\n}"
    To this object: {
        chatId: "1",
        content: "halloo"
    }*/
}

const argumentParser = (query) => {
    // Dynamically match any function name and extract arguments inside `(...)`
    const match = query.match(/\w+\s*\(([\s\S]*?)\)/);
    if (!match) return null; // Return null if no function arguments are found

    const argsString = match[1].trim(); // Extract arguments inside parentheses
    const argsArray = argsString.split(/\n|,/).map(arg => arg.trim()); // Split by newline or comma

    const jsonObj = {};
    argsArray.forEach(arg => {
        if (arg.includes(":")) {
            const [key, value] = arg.split(/:\s*/);
            jsonObj[key.trim()] = isNaN(value) ? value.replace(/"/g, '') : Number(value);
        }
    });

    return jsonObj;
};

module.exports = {
    objectParser,
    argumentParser
};