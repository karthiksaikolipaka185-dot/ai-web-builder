const parseAIResponse = (responseText) => {
  let description = '';
  let code = '';

  const htmlMatch = responseText.match(/```html([\s\S]*?)```/);
  const genericMatch = responseText.match(/```([\s\S]*?)```/);

  if (htmlMatch) {
    code = htmlMatch[1].trim();
    description = responseText.split(/```html/)[0].trim();
  } else if (genericMatch) {
    code = genericMatch[1].trim();
    description = responseText.split(/```/)[0].trim();
  } else {
    description = responseText.trim();
    code = '';
  }

  return { description, code };
};

module.exports = {
  parseAIResponse,
};
