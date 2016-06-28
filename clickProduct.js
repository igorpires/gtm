// variáveis
var name = '',
	id = '',
	price = '',
	brand = '',
	category = '',
	variante = '',
	list = '',
	position = '',
	items = [],
	_this = '',
	url = '',
	page = $('body').attr('class').split(' ')[0];

var pushDatalayer = function(items, url, _name, _list){
	dataLayer.push({
		'event': 'gaEvent',
		'gaEventCategory': 'Enhanced Ecommerce',
		'gaEventAction': 'Click Produto',
		'gaEventLabel': _name,
		'gaEventValue': '',
		'ecommerce': {
			'click': {
				'actionField': {
					'list': _list
				},
				'products': items
			}
		}
	});
}

var clickProduct = function (_this){
	name = _this.find('h3 a').html();
	brand = _this.find('.brand a').html();
	id = _this.find('.product-data-id').html();
	variant = '';
	url = _this.find('.productImage').attr('href');
	category = _this.find('.categoryProduct').attr('value');
	try {
		price = _this.find('.newPrice em').html().split(' ')[1].replace(',','.');
	}catch(error) {
		console.info(error);
		price = 0;
	}
	position = _this.index() + 1;
	if(page === 'home'){
		list = _this.parents('.prateleira').find('h2').html();
	}else {
		list = vtxctx.categoryName;
	}
	// cria cookie
	var amanha = new Date();
	amanha.setDate(amanha.getDate() + 1);
	document.cookie = 'listClick='+list+'; expires='+amanha+'; path=/';
	// 

	items = {
		'name': name,
		'id': id,
		'price':price,
		'brand': brand,
		'category':category,
		'list':list,
		'position':position
	}

	pushDatalayer(items, url, page, list);	
};

$('.prateleira').on('click', 'a', function(){
	_this = $(this);
	clickProduct(_this);
});



