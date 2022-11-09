const popupCenter = (url: string, title: string) => {

	const dualScreenLeft = window.screenLeft ?? window.screenX;
	const dualScreenTop = window.screenTop ?? window.screenY;

	const width =
		window.innerWidth ?? document.documentElement.clientWidth ?? screen.width;

	const height =
		window.innerHeight ??
		document.documentElement.clientHeight ??
		screen.height;

	const systemZoom = width / window.screen.availWidth;

	const left = (width - 500) / 2 / systemZoom + dualScreenLeft;
	const top = (height - 550) / 2 / systemZoom + dualScreenTop;

	const newWindow = window.open(
		url,
		title,
	//	 `width=${500 / systemZoom},height=${550 / systemZoom
	//	 },top=${top},left=${left}`
	`top=${top}, left=${left}, width=550,height=800`
	);
	

	newWindow?.focus();
	// newWindow?.addEventListener('beforeunload', () => {
	// 	console.log('여기에 실행하고 싶은 코드를 작성하면 된다능...쿰척');
	//  });
	//  newWindow?.addEventListener('unload', () => {
	// 	console.log('5252...나는 window.close()도 잡아낼 수 있다구..~');
	//  });
	};

	export default popupCenter;