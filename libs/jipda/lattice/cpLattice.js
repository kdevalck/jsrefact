goog.provide('cplattice');

function CpLattice()
{
	return (function ()
	{
		var module = Object.create(Lattice.prototype);
		
		function Some(cvalue)
		{
			this.cvalue = cvalue;
		}
		Some.prototype = Object.create(LatticeValue.prototype);

		Some.prototype.compareTo =
		  function (x)
		  {
		    if (x === Top)
		    {
		      return -1;
		    }
		    
		    if (!x)
		    {
		      return undefined;
		    }
		    
        return Eq.equals(this.cvalue, x.cvalue) ? 0 : undefined;		      
		  };
			
		Some.prototype.toString =
			function (printer)
			{
		    if (printer)
		    {
	        return printer(this.cvalue);		      
		    }
		    return String(this.cvalue);
			};
			
		Some.prototype.join =
			function (aval)
			{
				if (aval === BOT)
				{
					return this;
				}
				return Top;
			};

    Some.prototype.conc =
      function ()
      {
        return [this.cvalue];
      };
      
    Some.prototype.ToString =
      function ()
      {
        return new Some(LatticeValue.ToString(this.cvalue));
      };
      
    Some.prototype.ToUInt32 =
      function ()
      {
        return new Some(LatticeValue.ToUInt32(this.cvalue));
      };
      
    Some.prototype.ToInt32 =
      function ()
      {
        return new Some(LatticeValue.ToInt32(this.cvalue));
      };
          
    Some.prototype.ToNumber =
      function ()
      {
        return new Some(LatticeValue.ToNumber(this.cvalue));
      };
          
    Some.prototype.ToBoolean =
      function ()
      {
        return new Some(LatticeValue.ToBoolean(this.cvalue));
      };
      
    Some.prototype.limitStringNumber =
      function ()
      {
        if (typeof this.cvalue === "string" || typeof this.cvalue === "number")
        {
          return this;
        }
        return BOT;
      }
    
    Some.prototype.accept =
      function (visitor)
      {
        return visitor.visitSome(this);
      }
      
    var Top = Object.create(new LatticeValue()); 
    Top.join = function (other) { return Top };
    Top.compareTo = function (other) { return other === Top ? 0 : 1 };
    Top.isAddress = function () { return false };
    Top.addresses = function () { return false };
    Top.conc = function () { return false };
    Top.toString = function () { return "^" };
    Top.nice = function () { return "^" };
    Top.ToBoolean = function () { return Top };
    Top.ToString = function () { return Top };
    Top.ToUInt32 = function () { return Top };
    Top.ToInt32 = function () { return Top };
    Top.ToNumber = function () { return Top };
    Top.limitStringNumber = function () { return Top };
    Top.accept = function (visitor) { return visitor.visitTop(this) };
      
      module.Top = Top;
    
      module.add =
        function (x, y)
        {
          if (x === BOT || y === BOT)
          {
            return BOT;
          }
          if (x === Top || y === Top) 
          {
            return Top;
          }
          return new Some(x.cvalue + y.cvalue);                  
        }
        
      module.sub =
        function (x, y)
        {
        if (x === BOT || y === BOT)
        {
          return BOT;
        }
        if (x === Top || y === Top) 
        {
          return Top;
        }
        return new Some(x.cvalue - y.cvalue);                  
        }
      
      module.mul =
        function (x, y)
        {
          if (x === BOT || y === BOT)
          {
            return BOT;
          }
          if (x === Top || y === Top) 
          {
            return Top;
          }
          return new Some(x.cvalue * y.cvalue);                  
        }
        
      module.div =
        function (x, y)
        {
          if (x === BOT || y === BOT)
          {
            return BOT;
          }
          if (x === Top || y === Top) 
          {
            return Top;
          }
          return new Some(x.cvalue / y.cvalue);                  
        }
        
      module.eqq =
        function (x, y)
        {
          if (x === BOT || y === BOT)
          {
            return BOT;
          }
          if (x === Top || y === Top) 
          {
            return Top; // TODO join(true, false)  [here and for other equal/rel preds]
          }
          return new Some(x.cvalue === y.cvalue);                  
        }
        
      module.neqq =
        function (x, y)
        {
          if (x === BOT || y === BOT)
          {
            return BOT;
          }
          if (x === Top || y === Top) 
          {
            return Top;
          }
          return new Some(x.cvalue !== y.cvalue);                  
        }
        
      module.eq =
        function (x, y)
        {
          if (x === BOT || y === BOT)
          {
            return BOT;
          }
          if (x === Top || y === Top) 
          {
            return Top;
          }
          return new Some(x.cvalue == y.cvalue);                  
        }
        
      module.neq =
        function (x, y)
        {
          if (x === BOT || y === BOT)
          {
            return BOT;
          }
          if (x === Top || y === Top) 
          {
            return Top;
          }
          return new Some(x.cvalue != y.cvalue);                  
        }
        
      module.lt =
        function (x, y)
        {
          if (x === BOT || y === BOT)
          {
            return BOT;
          }
          if (x === Top || y === Top) 
          {
            return Top;
          }
          return new Some(x.cvalue < y.cvalue);                  
        }
        
      module.lte =
        function (x, y)
        {
          if (x === BOT || y === BOT)
          {
            return BOT;
          }
          if (x === Top || y === Top) 
          {
            return Top;
          }
          return new Some(x.cvalue <= y.cvalue);                  
        }
        
      module.gt =
        function (x, y)
        {
          if (x === BOT || y === BOT)
          {
            return BOT;
          }
          if (x === Top || y === Top) 
          {
            return Top;
          }
          return new Some(x.cvalue > y.cvalue);                  
        }
        
      module.gte =
        function (x, y)
        {
          if (x === BOT || y === BOT)
          {
            return BOT;
          }
          if (x === Top || y === Top) 
          {
            return Top;
          }
          return new Some(x.cvalue >= y.cvalue);                  
        }
        
      module.binand =
        function (x, y)
        {
          if (x === BOT || y === BOT)
          {
            return BOT;
          }
          if (x === Top || y === Top) 
          {
            return Top;
          }
          return new Some(x.cvalue & y.cvalue);                  
        }
        
      module.binor =
        function (x, y)
        {
          if (x === BOT || y === BOT)
          {
            return BOT;
          }
          if (x === Top || y === Top) 
          {
            return Top;
          }
          return new Some(x.cvalue | y.cvalue);                  
        }
        
      module.binnot =
        function (x)
        {
          if (x === BOT)
          {
            return BOT;
          }
          if (x === Top) 
          {
            return Top;
          }
          return new Some(~x.cvalue);                  
        }
        
      module.neg =
        function (x)
        {
          if (x === BOT)
          {
            return BOT;
          }
          if (x === Top) 
          {
            return Top;
          }
          return new Some(-x.cvalue);                  
        }
        
      module.pos =
        function (x)
        {
          if (x === BOT)
          {
            return BOT;
          }
          if (x === Top) 
          {
            return Top;
          }
          return new Some(+x.cvalue);                  
        }
        
      module.not =
        function (x)
        {
          if (x === BOT)
          {
            return BOT;
          }
          if (x === Top) 
          {
            return Top;
          }
          return new Some(!x.cvalue);                  
        }
        
      module.sqrt =
        function (x)
        {
          if (x === BOT)
          {
            return BOT;
          }
          if (x === Top) 
          {
            return Top;
          }
          return new Some(Math.sqrt(x.cvalue));                  
        }
        
    module.abst =
      function (cvalues)
      {
        if (cvalues.length === 0)
        {
          return BOT;
        }
        if (cvalues.length === 1)
        {
          return new Some(cvalues[0]);
        }
        return Top;
      };
      
    module.abst1 =
      function (cvalue)
      {
        return new Some(cvalue);
      }
        
		module.isFalse =
			function (aval)
			{
				return aval.cvalue === false;
			}
			
    module.isTrue =
      function (aval)
      {
        return aval.cvalue === true;
      }
      
		return module;
	})();
}
