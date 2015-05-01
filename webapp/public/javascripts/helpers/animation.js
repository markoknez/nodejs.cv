var animations = {
	funkyIn: function(e, done) {
		TweenMax.from(e, 0.5, {
			y: "-=30px",
			rotation: "-40deg",
			alpha: 0,
			scale: 1.8,
			height: 0,
			ease: Back.easeOut,
			onComplete: done,
			clearProps: 'all',
			force3D: true
		});
	},
	funkyOut: function(e, done) {
		var tl = new TimelineMax();
		tl.to(e, 0.5, {
			y: "-=30px",
			rotation: "-40deg",
			alpha: 0,
			scale: 1.8,
			ease: Back.easeOut,
			margin: 0,
			padding: 0,
			height: 0,
			onComplete: done,
			clearProps: 'all',
			force3D: true
		});
	},

	jqSlideIn: function(e, done) {
		$(e).slideDown(done);
	},
	jqSlideOut: function(e, done) {
		$(e).slideUp(done);
	},
	jqFadeIn: function(e, done) {
		$(e).fadeIn(done);
	},
	jqFadeOut: function(e, done) {
		$(e).fadeOut(done);
	},

	slideIn: function(e, done) {
		TweenMax.from(e, 0.5, {
			height: 0,
			ease: Back.easeOut,
			onComplete: done,
			clearProps: 'all'
		});
	},
	slideOut: function(e, done) {
		var tl = new TimelineMax();

		tl.to(e, 0.75, {
				scale: 0,
				overflow: 'hidden',
				// rotation: 360,
				ease: Back.easeOut
			})
			.to(e, 0.5, {
				height: 0,
				ease: Back.easeOut,
				onComplete: done,
				clearProps: 'all'
			});
	}
};

angular
	.module('myAnimate', ['ngAnimate'])
	.animation('.my-animate', function() {

		return {
			enter: function(element, done) {
				var animType = $(element).attr('anim-type');
				var inAnimation = animations[animType + 'In'];
				if (inAnimation)
					inAnimation(element, done);
				else
					throw new Error('Animation animType not supported.'.replace(/animType/, animType));
			},
			leave: function(element, done) {
				var animType = $(element).attr('anim-type');
				var outAnimation = animations[animType + 'Out'];
				if (outAnimation)
					outAnimation(element, done);
				else
					throw new Error('Animation animType not supported.'.replace(/animType/, animType));

			},
			addClass: function(element, className, done) {
				if (className == 'ng-hide') {
					var animType = $(element).attr('anim-type');
					var outAnimation = animations[animType + 'Out'];
					if (outAnimation)
						outAnimation(element, done);
					else
						throw new Error('Animation animType not supported.'.replace(/animType/, animType));
				}
			},
			removeClass: function(element, className, done) {
				if (className == 'ng-hide') {
					var animType = $(element).attr('anim-type');
					var inAnimation = animations[animType + 'In'];
					if (inAnimation)
						inAnimation(element, done);
					else
						throw new Error('Animation animType not supported.'.replace(/animType/, animType));
				}
			}
		};
	});