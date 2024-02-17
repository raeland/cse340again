INSERT INTO public.account (
		account_first_name,
		account_last_name,
		account_email,
		account_password
	)
VALUES (
		'Tony',
		'Stark',
		'tony@starkent.com',
		'Iam1ronM@n'
	);
INSERT INTO account (
		account_first_name,
		account_last_name,
		account_email,
		account_password,
		account_type
	)
VALUES (
		'Tony',
		'Stark',
		'tony@starkent.com',
		'Iam1ronM@n',
		'Admin'
	);
DELETE FROM public.account
WHERE first_name = 'Tony'
	AND last_name = 'Stark';
UPDATE public.inventory
SET inv_description = REPLACE(
		inv_description,
		'small interiors',
		'a huge interior'
	)
WHERE inv_make = 'GM'
	AND inv_model = 'Hummer';
SELECT i.inv_make,
	i.inv_model,
	c.classification_name
FROM inventory i
	INNER JOIN classification c ON i.classification_id = c.classification_id
WHERE c.classification_name = 'Sport';
UPDATE inventory
SET inv_image = REPLACE(inv_image, '/images', '/images/vehicles/'),
	inv_thumbnail = REPLACE(
		inv_thumbnail,
		'/thumbnails/',
		'/thumbnails/vehicles/'
	);