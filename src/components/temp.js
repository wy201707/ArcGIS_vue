function(e,l,k,g,q,x,y,D,F,z,p,d,c,m,h,b,n)
{   function t(M,V){
        return V.type?z.set(M,V.x,V.y):z.copy(M,V)
    }
    function r(M,V){
        return Math.max(M.width/V[0],M.height/V[1])*X(M.spatialReference)}function u(M,V,ca,ha){return C.apply(this,arguments)}
        function C(){
            C=l._asyncToGenerator(function*(M,V,ca,ha){
                if(!M||Array.isArray(M)&&!M.length)
                return null;
                g.isCollection(M)&&(M=M.toArray());if(Array.isArray(M)&&M.length&&"object"===typeof M[0]){var ka=M.every(Ka=>"attributes"in Ka);
        var pa=M.some(Ka=>!Ka.geometry)