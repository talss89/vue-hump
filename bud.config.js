export default async bud => {
    bud.setPath('@src', 'test/bundle/src')
    bud.setPath('@dist', 'test/bundle/build')
    bud.runtime('single')
    bud.entry('shim') 
  }
  
  