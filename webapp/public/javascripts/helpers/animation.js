function slideDown(e, done){
	TweenMax.from(e, 0.5, {y:"-=30px", rotation:"-40deg", alpha:0, scale:1.8, height: 0, ease:Back.easeOut, onComplete: done, clearProps: 'all', force3D: true});
}

function slideUp (e, done) {	
	var tl = new TimelineMax();	
	tl.to(e, 0.5, {y:"-=30px", rotation:"-40deg", alpha:0, scale:1.8, ease:Back.easeOut, margin:0, padding: 0, height: 0
			// });
	, onComplete: done, clearProps: 'all', force3D: true});	
}

angular
	.module('myAnimate', ['ngAnimate'])
	.animation('.my-animate', function() {

		return {
			enter: function(element, done) {
				// $(element).hide();
				var animType = $(element).attr('anim-type');
				if (animType.indexOf('-') != -1) {
					var animationName = animType.split('-')[0];
					$(element)[animationName](done);
				} else {
					if (animType == 'slide') {
						slideDown(element, done)
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
						slideUp(element, done)
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
							slideUp(element, done)
						} else if (animType == 'fade') {
							$(element).fadeOut(done);
						} else
							throw new Error('Animation animType not supported.'.replace(/animType/, animType));
					}
				}
			},
			removeClass: function(element, className, done) {
				if (className == 'ng-hide') {
					// $(element).css('bottom', '-100%');
					var animType = $(element).attr('anim-type');
					if (animType.indexOf('-') != -1) {
						var animationName = animType.split('-')[0];
						$(element)[animationName](done);
					} else {
						if (animType == 'slide') {
							slideDown(element, done)
						} else if (animType == 'fade') {
							$(element).fadeIn(done);
						} else
							throw new Error('Animation animType not supported.'.replace(/animType/, animType));
					}

				}
			}
		};
	});