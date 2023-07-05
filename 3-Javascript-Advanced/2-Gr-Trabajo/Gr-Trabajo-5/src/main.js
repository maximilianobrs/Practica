import './assets/css/bootstrap.min.css';
import {
	getCategories,
	getDetails,
	getMealByCategory,
} from './assets/js/utils';

document.addEventListener('DOMContentLoaded', async () => {
	const categoria = document.querySelector('#categoria');

	const categorias = await getCategories();

	categorias.forEach((cat) => {
		const option = document.createElement('option');
		option.value = cat.category;
		option.textContent = cat.categoryEs;

		categoria.appendChild(option);
	});

	categoria.addEventListener('change', async (e) => {
		const meals = await getMealByCategory(e.target.value);

		const mealsContainer = document.querySelector('#comidas');

		mealsContainer.innerHTML = '';

		meals.forEach(async (meal) => {
			const details = await getDetails(meal.idMeal);

			const div = document.createElement('div');
			div.classList.add('col-md-4', 'mb-3');

			div.innerHTML = `
				<div class="card">
					<img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
					<div class="card-body">
						<h5 class="card-title">${meal.strMeal}</h5>
						<p class="card-text text-truncate">${details}</p>
					</div>
				</div>
			`;

			mealsContainer.appendChild(div);
		});
	});
});
