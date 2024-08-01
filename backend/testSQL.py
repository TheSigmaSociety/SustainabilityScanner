import mysql.connector
from dotenv import load_dotenv
import os
import utils

load_dotenv()

utils.sqlInit()
# utils.sqlInsert("users", ["username", "score"], ["Freddy fazbear", 69])
# utils.sqlInsert("products", ["name", "score", "description"], ["freddy's signature cheese pizza", 69, "ishan sHARma"])
# utils.downloadImage("carrot", limit=1, filename="carrot.png")

#for the prompt, we can make it so that there are no indentations between the lines later, so that its easier to splice and give to front end (but for now, leave it as is for testing har har har har har har har har har har)
PROMPT = "Using the given food item/ingredients label, identify the possible ingredients and parts of the product which could have a SIGNIFICANT impact on sustainability. The product has a starting score of 10/10 (which SHOULD NOT BE DISPLAYED TO THE USER). For each ingredient/component in the product or its manufacturing process that could be considered to create a SIGNFICIANTLY NEGATIVE IMPACT ON SUSTAINABILITY, deduct one point from the starting score. However, if an ingredient/component can be deemed to be ESPECIALLY NEGATIVE TO SUSTAINABILITY, deduct 2 points from the original score. Note that the fact in which the item has an original score of 10/10 shall NEVER BE DISPLAYED TO THE USER. Also make sure to identify the TOP THREE MOSTLY NEGATIVE COMPONENTS/INGREDIENTS IN THE FOOD ITEM WHICH COULD IMPACT SUSTAINABILIY and give them to the user in a formatted list with each new material on a new line. Only include the top 3 worst materials for sustainability. Also include a small explanation for each of the materials as to why they are not sustainable. At the end, you must display the 'final score' of the food item out of ten to the user. The response MUST be in plain text, no formatting such as * or # and follow this template: food item name (make sure this is always singular and using proper capitalization), Non-Sustainable item(s) list (if there are none, say: This item has no discernable non-sustainable components! (make sure there are still indentations between the item name, list, and final score), Final Score. Do not deviate from this format under any circumstances. For processed items, make sure you grade the final score harsher. For non-processed items such as natural fruits and vegetables, give a higher score as they are more sustainable than processed foods such as cereal, chips, etc."

print()
# print(utils.openaiRequest(r"backend\images\thing.jpeg", PROMPT))
print(utils.openaiRequest(r"backend\images\carrot.png", PROMPT))
print()

