//config here

requirejs.config({
  baseUrl: '/assets/app',
  paths: {
    jquery: '../vendor/jquery/dist/jquery.min',
    bootstrap: '../vendor/bootstrap/dist/js/bootstrap.min',
    mainapp: 'musicapp'
  },

  shim : {
    bootstrap : {
      deps : [ 'jquery'],
      exports: 'Bootstrap'
    },
  }
});