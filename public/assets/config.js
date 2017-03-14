//config here

requirejs.config({
  baseUrl: '/assets/',
  paths: {
    jquery: 'vendor/jquery/dist/jquery.min',
    bootstrap: 'vendor/bootstrap/dist/js/bootstrap.min',
    mainapp: 'app/musicapp'
  },

  shim : {
    bootstrap : {
      deps : [ 'jquery'],
      exports: 'Bootstrap'
    },
  }
});