/**
 * This file holds the properties
 * and methods needed to create the
 * app view.
 */
sk.stsc.model.AppModel = Backbone.Model.extend({
	
	dispatcher: null,
	view: null,
	layout: null,
	navBar: null,
	layoutManager: null,
	about: null,
	pong: null,
	initialized: false,
	
	defaults: {
		socketStatus: false,
		dimensions: null,
		menu: null,
		menuButton: null,
		content: null,
	},
	
	initialize: function(options) {
		try {
			if (options.dispatcher && options.layout) {
				this.dispatcher = options.dispatcher;
				this.layout = options.layout;
			} else {
				throw 'Argument "dispatcher" and or "layout" missing.';
			}
		} catch(e) {
			var msg = 'Illegal AppModel object initialization: ' + e;
			throw new Error(msg);
		}
		
		var self = this;
		this.dispatcher.bind('socketOpen', function(e) { self.initComponents(e); });
		this.dispatcher.bind('swapContent', function(e) { self.handleContentSwap(e); });
		this.layout.on('change:pageList', self.handleLayoutChange, this);
		//sk.log.debug('logging test');
	},
	
	initComponents: function(sockStat) {
		if (sockStat && !this.initialized) {
			this.navBar = new sk.stsc.model.NavBarModel({ dispatcher: this.dispatcher });
			this.layoutManager = new sk.stsc.view.LOManagerView({ 
				dispatcher: this.dispatcher,
				el: '#main'
			});
			this.about = new sk.stsc.view.AboutView({ el: '#main' });
			/*
			this.pong = new sk.stsc.model.PongModel({
				dispatcher: this.dispatcher,
				el: '#main'
			});
			*/
			this.view = new sk.stsc.view.AppView({model: this});
			this.initialized = true;
		}
	},
	
	handleLayoutChange: function() {
		console.log('layout has changed');
		this.view.renderMainArea('Mixer');
	},
	
	handleContentSwap: function(item) {
		this.view.renderMainArea(item);
	}

	
});