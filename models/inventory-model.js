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
  } catch (error) {
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
      return error.message("getClassificationName error" + error)
  }
}

/* ***************************
 *  ADD New Inventory
 * ************************** */
async function addInventory(
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
      return error.message("getInventory error" + error)
  }
}

/* ***************************
 *  UPDATE New Inventory
 * ************************** */
async function updateInventory(
  inv_id,
  inv_make,
  inv_model,
  inv_year,
  inv_description,
  inv_image,
  inv_thumbnail,
  inv_price,
  inv_miles,
  inv_color,
  classification_id
  ) {
      try {
          const sql = "UPDATE public.inventory SET inv_make = $1, inv_model = $2, inv_year = $3, inv_description = $4, inv_image = $5, inv_thumbnail = $6, inv_price = $7, inv_miles = $8, inv_color = $9, classification_id = $10, inv_id = $11 RETURNING *";
          const values = [inv_make,
            inv_model,
            inv_year,
            inv_description,
            inv_image,
            inv_thumbnail,
            inv_price,
            inv_miles,
            inv_color,
            classification_id,
            inv_id]
          const data = await pool.query(sql, values)
          return data.rows[0]
      } catch (error) {
          return error.message("model error: " + error)
  }
}

/* ***************************
 *  DELETE Inventory
 * ************************** */
async function deleteInventory(inv_id) {
  try {
    const sql = "DELETE FROM public.inventory WHERE inv_id = $1";
    const values = [inv_id]
    const data = await pool.query(sql, inv_id)
    return data
  } catch (error) {
    new Error("Delete Inventory Error")
  }
}


module.exports = { getClassifications, getInventoryByClassificationId, getInventoryByInventoryId, addClass, addInventory, updateInventory, deleteInventory }