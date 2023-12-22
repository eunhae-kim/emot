function setupDatadogTracing() {
    const { tracer: Tracer } = require('dd-trace');
    const tracer = Tracer.init({logInjection: true});
  }
  
  setupDatadogTracing();
  