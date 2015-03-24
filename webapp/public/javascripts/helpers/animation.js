angular
	.module('myAnimate', ['ngAnimate'])
	.animation('.my-animate', function() {

		return {
			enter: function(element, done) {
				$(element).hide();
				var animType = $(element).attr('anim-type');
				if (animType.indexOf('-') != -1) {
					var animationName = animType.split('-')[0];
					$(element)[animationName](done);
				} else {
					if (animType == 'slide') {
						$(element).slideDown(done);
					} else if (animType == 'fade') {
						$(element).fadeIn(done);
					} else
						throw new Error('Animation animType not supported.'.replace(/animType/, animType));
				}
			},
			leave: function(element, done) {
				var animType = $(element).attr('anim-type');
				if (animType.indexOf('-') != -1) {
					var animationName = animType.split('-')[1];
					$(element)[animationName](done);
				} else {
					if (animType == 'slide') {
						$(element).slideUp(done);
					} else if (animType == 'fade') {
						$(element).fadeOut(done);
					} else
						throw new Error('Animation animType not supported.'.replace(/animType/, animType));
				}
			},
			addClass: function(element, className, done) {
				if (className == 'ng-hide') {
					var animType = $(element).attr('anim-type');
					if (animType.indexOf('-') != -1) {
						var animationName = animType.split('-')[1];
						$(element)[animationName](done);
					} else {
						if (animType == 'slide') {
							$(element).slideUp(done);
						} else if (animType == 'fade') {
							$(element).fadeOut(done);
						} else
							throw new Error('Animation animType not supported.'.replace(/animType/, animType));
					}
				}
			},
			removeClass: function(element, className, done) {
				if (className == 'ng-hide') {
					var animType = $(element).attr('anim-type');
					if (animType.indexOf('-') != -1) {
						var animationName = animType.split('-')[0];
						$(element)[animationName](done);
					} else {
						if (animType == 'slide') {
							$(element).slideDown(done);
						} else if (animType == 'fade') {
							$(element).fadeIn(done);
						} else
							throw new Error('Animation animType not supported.'.replace(/animType/, animType));
					}

				}
			}
		};
	});