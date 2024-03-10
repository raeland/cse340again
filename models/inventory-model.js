const pool = require("../database/")

/* ***************************
 *  Get all classification data
 * ************************** */
async function getClassifications(){
  return await pool.query("SELECT * FROM public.classification ORDER BY classification_name")
}

/* ***************************
 *  Get all inventory items and classification_name by classification_id
 * ************************** */
async function getInventoryByClassificationId(classification_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory AS i 
      JOIN public.classification AS c 
      ON i.classification_id = c.classification_id 
      WHERE i.classification_id = $1`,
      [classification_id]
    )
    return data.rows
  } catch (error) {
    console.error("getclassificationsbyid error " + error)
  }
}

/* ***************************
 *  Get all inventory detail by inventory_id
 * ************************** */
async function getInventoryByInventoryId(inv_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory
      WHERE inv_id = $1`, 
      [ inv_id ]
    )
    return data.rows[0]
  } 
  catch (error) {
    console.error("getInventoryById error" + error)
  }
}

/* ***************************
 *  ADD New Classification
 * ************************** */
async function addClass(classification_name) {
  try {
    const sql = "INSERT INTO public.classification (classification_name) VALUES ($1) RETURNING *"
    const values = [classification_name]
    return await pool.query(sql, values)
  } catch (error) {
      return error.message
  }
}

/* ***************************
 *  ADD New Inventory
 * ************************** */
async function addNewInventory(
  inv_make,
  inv_model,
  inv_color,
  inv_year,
  inv_description,
  inv_image,
  inv_thumbnail,
  inv_price,
  inv_miles,
  classification_id
) {
  try {
    const sql = "INSERT INTO public.inventory (inv_make, inv_model, inv_color, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, classification_id) VALUES ($1) RETURNING *"
    const values = [inv_make,
      inv_model,
      inv_color,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_miles,
      classification_id]
    return await pool.query(sql, values)
  } catch (error) {
      return error.message
  }
}

module.exports = { getClassifications, getInventoryByClassificationId, getInventoryByInventoryId, addClass, addNewInventory }