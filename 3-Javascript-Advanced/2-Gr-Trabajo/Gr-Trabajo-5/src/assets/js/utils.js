const categorias = [
	{
		en: 'Beef',
		es: 'Carne de res',
	},
	{
		en: 'Breakfast',
		es: 'Desayuno',
	},
	{
		en: 'Chicken',
		es: 'Pollo',
	},
	{
		en: 'Dessert',
		es: 'Postre',
	},
	{
		en: 'Goat',
		es: 'Cabra',
	},
	{
		en: 'Lamb',
		es: 'Cordero',
	},
	{
		en: 'Miscellaneous',
		es: 'Misceláneo',
	},
	{
		en: 'Pasta',
		es: 'Pasta',
	},
	{
		en: 'Pork',
		es: 'Cerdo',
	},
	{
		en: 'Seafood',
		es: 'Mariscos',
	},
	{
		en: 'Side',
		es: 'Acompañamiento',
	},
	{
		en: 'Starter',
		es: 'Entrada',
	},
	{
		en: 'Vegan',
		es: 'Vegano',
	},
	{
		en: 'Vegetarian',
		es: 'Vegetariano',
	},
];

const URL = 'https://www.themealdb.com/api/json/v1/1';

export const getCategories = async () => {
	const url = `${URL}/categories.php`;

	try {
		const response = await fetch(url);
		const data = await response.json();

		return data.categories.map((cat) => {
			return {
				id: cat.idCategory,
				category: cat.strCategory,
				categoryEs:
					categorias.find((c) => c.en === cat.strCategory).es ||
					cat.strCategory,
				description: cat.strCategoryDescription,
				img: cat.strCategoryThumb,
			};
		});
	} catch (error) {
		console.log(error);
	}
};

export const getMealByCategory = async (category) => {
	const url = `${URL}/filter.php?c=${category}`;

	try {
		const response = await fetch(url);
		const data = await response.json();

		return data.meals;
	} catch (error) {
		console.log(error);
	}
};

export const getDetails = async (id) => {
	const url = `${URL}/lookup.php?i=${id}`;

	try {
		const response = await fetch(url);
		const data = await response.json();

		return data.meals[0].strInstructions;
	} catch (error) {
		console.log(error);
	}
};
