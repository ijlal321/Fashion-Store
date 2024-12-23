import { useEffect, useState } from "react";
import { ShoppingCart, ChevronLeft, ChevronRight, LucideAsteriskSquare } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";
import { useProductStore } from "../stores/useProductStore";

const getCategoryWithHeighestClick = (data) => {
	let maxKey = '';
	let maxValue = -Infinity;

	// Iterate through the object
	for (const [key, value] of Object.entries(data)) {
		if (value > maxValue) {
			maxValue = value;
			maxKey = key;
		}
	}

	return maxKey;
};

const getRandomItems = (list, nr_items) => {
	// If nr_items is greater than the number of items in the list, adjust it
	const itemCount = Math.min(nr_items, list.length);
  
	// Step 1: Shuffle the list randomly
	const shuffledList = [...list]; // Copy the original list to avoid mutating it
	for (let i = shuffledList.length - 1; i > 0; i--) {
	  const randomIndex = Math.floor(Math.random() * (i + 1));
	  [shuffledList[i], shuffledList[randomIndex]] = [shuffledList[randomIndex], shuffledList[i]]; // Swap elements
	}
  
	// Step 2: Return the first 'itemCount' items from the shuffled list
	return shuffledList.slice(0, itemCount);
  };

const FeaturedProducts = () => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [itemsPerPage, setItemsPerPage] = useState(4);
	const [personalizedProducts, setPersonnalizedProducts] = useState([]);

	const { addToCart } = useCartStore();
	const { getAllProducts} = useProductStore();

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth < 640) setItemsPerPage(1);
			else if (window.innerWidth < 1024) setItemsPerPage(2);
			else if (window.innerWidth < 1280) setItemsPerPage(3);
			else setItemsPerPage(4);
		};

		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const nextSlide = () => {
		setCurrentIndex((prevIndex) => prevIndex + itemsPerPage);
	};

	const prevSlide = () => {
		setCurrentIndex((prevIndex) => prevIndex - itemsPerPage);
	};

	useEffect(() => {
		const loadPersonalizedProducts = async () => {
			const newProducts = [];
			const products = await getAllProducts();
			try {
				const categoriesClicked = JSON.parse(localStorage.getItem('CategoriesClicked'));
				const lastAddedToCartCategory = JSON.parse(localStorage.getItem('lastAddedToCartCategory'));
				const lastClickedCategory = JSON.parse(localStorage.getItem('lastClickedCategory'));
				const lastRemovedToCartProductId = JSON.parse(localStorage.getItem('lastRemovedToCartProductId'));

				if (categoriesClicked) {
					const mostClickedCategory = getCategoryWithHeighestClick(categoriesClicked);
					if (!mostClickedCategory) return;
					const filteredProducts = products.filter(product => product.category === mostClickedCategory);
					const randomProducts = getRandomItems(filteredProducts, 2);
					newProducts.push(...randomProducts);
				}
				if (lastAddedToCartCategory){
					const filteredProducts = products.filter(product => product.category === lastAddedToCartCategory);
					const randomProducts = getRandomItems(filteredProducts, 1);
					newProducts.push(...randomProducts);
				}
				if (lastClickedCategory){
					const filteredProducts = products.filter(product => product.category === lastClickedCategory);
					const randomProducts = getRandomItems(filteredProducts, 1);
					newProducts.push(...randomProducts);
				}
				if (lastRemovedToCartProductId){
					const selectedProduct = products.filter(product => product._id === lastRemovedToCartProductId);
					newProducts.push(...selectedProduct);
				}
				setPersonnalizedProducts(newProducts);
			}
			catch (e) {
				console.log(e);
			}
		}
		loadPersonalizedProducts();
	}, []);

	const isStartDisabled = currentIndex === 0;
	const isEndDisabled = currentIndex >= personalizedProducts.length - itemsPerPage;

	return (
		<div className='py-12'>
			<div className='container mx-auto px-4'>
				<h2 className='text-center text-5xl sm:text-6xl font-bold text-emerald-400 mb-6'>Personalized Products for You</h2>
				<div className='relative'>
					<div className='overflow-hidden'>
						<div
							className='flex transition-transform duration-300 ease-in-out'
							style={{ transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)` }}
						>
							{personalizedProducts?.map((product, index) => (
								<div key={index} className='w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 flex-shrink-0 px-2'>
									<div className='bg-white bg-opacity-10 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden h-full transition-all duration-300 hover:shadow-xl border border-emerald-500/30'>
										<div className='overflow-hidden'>
											<img
												src={product.image}
												alt={product.name}
												className='w-full h-48 object-cover transition-transform duration-300 ease-in-out hover:scale-110'
											/>
										</div>
										<div className='p-4'>
											<h3 className='text-lg font-semibold mb-2 text-white'>{product.name}</h3>
											<p className='text-emerald-300 font-medium mb-4'>
												${product.price.toFixed(2)}
											</p>
											<button
												onClick={() => addToCart(product)}
												className='w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2 px-4 rounded transition-colors duration-300 
												flex items-center justify-center'
											>
												<ShoppingCart className='w-5 h-5 mr-2' />
												Add to Cart
											</button>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
					<button
						onClick={prevSlide}
						disabled={isStartDisabled}
						className={`absolute top-1/2 -left-4 transform -translate-y-1/2 p-2 rounded-full transition-colors duration-300 ${isStartDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-emerald-600 hover:bg-emerald-500"
							}`}
					>
						<ChevronLeft className='w-6 h-6' />
					</button>

					<button
						onClick={nextSlide}
						disabled={isEndDisabled}
						className={`absolute top-1/2 -right-4 transform -translate-y-1/2 p-2 rounded-full transition-colors duration-300 ${isEndDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-emerald-600 hover:bg-emerald-500"
							}`}
					>
						<ChevronRight className='w-6 h-6' />
					</button>
				</div>
			</div>
		</div>
	);
};
export default FeaturedProducts;
