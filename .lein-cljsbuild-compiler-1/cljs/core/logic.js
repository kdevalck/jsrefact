goog.provide('cljs.core.logic');
goog.require('cljs.core');
goog.require('clojure.walk');
goog.require('clojure.walk');
goog.require('clojure.set');
cljs.core.logic._STAR_occurs_check_STAR_ = true;
cljs.core.logic.IUnifyTerms = {};
cljs.core.logic._unify_terms = (function _unify_terms(u,v,s){
if((function (){var and__3822__auto__ = u;
if(and__3822__auto__)
{return u.cljs$core$logic$IUnifyTerms$_unify_terms$arity$3;
} else
{return and__3822__auto__;
}
})())
{return u.cljs$core$logic$IUnifyTerms$_unify_terms$arity$3(u,v,s);
} else
{var x__2373__auto__ = (((u == null))?null:u);
return (function (){var or__3824__auto__ = (cljs.core.logic._unify_terms[goog.typeOf(x__2373__auto__)]);
if(or__3824__auto__)
{return or__3824__auto__;
} else
{var or__3824__auto____$1 = (cljs.core.logic._unify_terms["_"]);
if(or__3824__auto____$1)
{return or__3824__auto____$1;
} else
{throw cljs.core.missing_protocol("IUnifyTerms.-unify-terms",u);
}
}
})().call(null,u,v,s);
}
});
cljs.core.logic.IUnifyWithNil = {};
cljs.core.logic._unify_with_nil = (function _unify_with_nil(v,u,s){
if((function (){var and__3822__auto__ = v;
if(and__3822__auto__)
{return v.cljs$core$logic$IUnifyWithNil$_unify_with_nil$arity$3;
} else
{return and__3822__auto__;
}
})())
{return v.cljs$core$logic$IUnifyWithNil$_unify_with_nil$arity$3(v,u,s);
} else
{var x__2373__auto__ = (((v == null))?null:v);
return (function (){var or__3824__auto__ = (cljs.core.logic._unify_with_nil[goog.typeOf(x__2373__auto__)]);
if(or__3824__auto__)
{return or__3824__auto__;
} else
{var or__3824__auto____$1 = (cljs.core.logic._unify_with_nil["_"]);
if(or__3824__auto____$1)
{return or__3824__auto____$1;
} else
{throw cljs.core.missing_protocol("IUnifyWithNil.-unify-with-nil",v);
}
}
})().call(null,v,u,s);
}
});
cljs.core.logic.IUnifyWithObject = {};
cljs.core.logic._unify_with_object = (function _unify_with_object(v,u,s){
if((function (){var and__3822__auto__ = v;
if(and__3822__auto__)
{return v.cljs$core$logic$IUnifyWithObject$_unify_with_object$arity$3;
} else
{return and__3822__auto__;
}
})())
{return v.cljs$core$logic$IUnifyWithObject$_unify_with_object$arity$3(v,u,s);
} else
{var x__2373__auto__ = (((v == null))?null:v);
return (function (){var or__3824__auto__ = (cljs.core.logic._unify_with_object[goog.typeOf(x__2373__auto__)]);
if(or__3824__auto__)
{return or__3824__auto__;
} else
{var or__3824__auto____$1 = (cljs.core.logic._unify_with_object["_"]);
if(or__3824__auto____$1)
{return or__3824__auto____$1;
} else
{throw cljs.core.missing_protocol("IUnifyWithObject.-unify-with-object",v);
}
}
})().call(null,v,u,s);
}
});
cljs.core.logic.IUnifyWithLVar = {};
cljs.core.logic._unify_with_lvar = (function _unify_with_lvar(v,u,s){
if((function (){var and__3822__auto__ = v;
if(and__3822__auto__)
{return v.cljs$core$logic$IUnifyWithLVar$_unify_with_lvar$arity$3;
} else
{return and__3822__auto__;
}
})())
{return v.cljs$core$logic$IUnifyWithLVar$_unify_with_lvar$arity$3(v,u,s);
} else
{var x__2373__auto__ = (((v == null))?null:v);
return (function (){var or__3824__auto__ = (cljs.core.logic._unify_with_lvar[goog.typeOf(x__2373__auto__)]);
if(or__3824__auto__)
{return or__3824__auto__;
} else
{var or__3824__auto____$1 = (cljs.core.logic._unify_with_lvar["_"]);
if(or__3824__auto____$1)
{return or__3824__auto____$1;
} else
{throw cljs.core.missing_protocol("IUnifyWithLVar.-unify-with-lvar",v);
}
}
})().call(null,v,u,s);
}
});
cljs.core.logic.IUnifyWithLSeq = {};
cljs.core.logic._unify_with_lseq = (function _unify_with_lseq(v,u,s){
if((function (){var and__3822__auto__ = v;
if(and__3822__auto__)
{return v.cljs$core$logic$IUnifyWithLSeq$_unify_with_lseq$arity$3;
} else
{return and__3822__auto__;
}
})())
{return v.cljs$core$logic$IUnifyWithLSeq$_unify_with_lseq$arity$3(v,u,s);
} else
{var x__2373__auto__ = (((v == null))?null:v);
return (function (){var or__3824__auto__ = (cljs.core.logic._unify_with_lseq[goog.typeOf(x__2373__auto__)]);
if(or__3824__auto__)
{return or__3824__auto__;
} else
{var or__3824__auto____$1 = (cljs.core.logic._unify_with_lseq["_"]);
if(or__3824__auto____$1)
{return or__3824__auto____$1;
} else
{throw cljs.core.missing_protocol("IUnifyWithLSeq.-unify-with-lseq",v);
}
}
})().call(null,v,u,s);
}
});
cljs.core.logic.IUnifyWithSequential = {};
cljs.core.logic._unify_with_seq = (function _unify_with_seq(v,u,s){
if((function (){var and__3822__auto__ = v;
if(and__3822__auto__)
{return v.cljs$core$logic$IUnifyWithSequential$_unify_with_seq$arity$3;
} else
{return and__3822__auto__;
}
})())
{return v.cljs$core$logic$IUnifyWithSequential$_unify_with_seq$arity$3(v,u,s);
} else
{var x__2373__auto__ = (((v == null))?null:v);
return (function (){var or__3824__auto__ = (cljs.core.logic._unify_with_seq[goog.typeOf(x__2373__auto__)]);
if(or__3824__auto__)
{return or__3824__auto__;
} else
{var or__3824__auto____$1 = (cljs.core.logic._unify_with_seq["_"]);
if(or__3824__auto____$1)
{return or__3824__auto____$1;
} else
{throw cljs.core.missing_protocol("IUnifyWithSequential.-unify-with-seq",v);
}
}
})().call(null,v,u,s);
}
});
cljs.core.logic.IUnifyWithMap = {};
cljs.core.logic._unify_with_map = (function _unify_with_map(v,u,s){
if((function (){var and__3822__auto__ = v;
if(and__3822__auto__)
{return v.cljs$core$logic$IUnifyWithMap$_unify_with_map$arity$3;
} else
{return and__3822__auto__;
}
})())
{return v.cljs$core$logic$IUnifyWithMap$_unify_with_map$arity$3(v,u,s);
} else
{var x__2373__auto__ = (((v == null))?null:v);
return (function (){var or__3824__auto__ = (cljs.core.logic._unify_with_map[goog.typeOf(x__2373__auto__)]);
if(or__3824__auto__)
{return or__3824__auto__;
} else
{var or__3824__auto____$1 = (cljs.core.logic._unify_with_map["_"]);
if(or__3824__auto____$1)
{return or__3824__auto____$1;
} else
{throw cljs.core.missing_protocol("IUnifyWithMap.-unify-with-map",v);
}
}
})().call(null,v,u,s);
}
});
cljs.core.logic.IUnifyWithSet = {};
cljs.core.logic._unify_with_set = (function _unify_with_set(v,u,s){
if((function (){var and__3822__auto__ = v;
if(and__3822__auto__)
{return v.cljs$core$logic$IUnifyWithSet$_unify_with_set$arity$3;
} else
{return and__3822__auto__;
}
})())
{return v.cljs$core$logic$IUnifyWithSet$_unify_with_set$arity$3(v,u,s);
} else
{var x__2373__auto__ = (((v == null))?null:v);
return (function (){var or__3824__auto__ = (cljs.core.logic._unify_with_set[goog.typeOf(x__2373__auto__)]);
if(or__3824__auto__)
{return or__3824__auto__;
} else
{var or__3824__auto____$1 = (cljs.core.logic._unify_with_set["_"]);
if(or__3824__auto____$1)
{return or__3824__auto____$1;
} else
{throw cljs.core.missing_protocol("IUnifyWithSet.-unify-with-set",v);
}
}
})().call(null,v,u,s);
}
});
cljs.core.logic.IReifyTerm = {};
cljs.core.logic._reify_term = (function _reify_term(v,s){
if((function (){var and__3822__auto__ = v;
if(and__3822__auto__)
{return v.cljs$core$logic$IReifyTerm$_reify_term$arity$2;
} else
{return and__3822__auto__;
}
})())
{return v.cljs$core$logic$IReifyTerm$_reify_term$arity$2(v,s);
} else
{var x__2373__auto__ = (((v == null))?null:v);
return (function (){var or__3824__auto__ = (cljs.core.logic._reify_term[goog.typeOf(x__2373__auto__)]);
if(or__3824__auto__)
{return or__3824__auto__;
} else
{var or__3824__auto____$1 = (cljs.core.logic._reify_term["_"]);
if(or__3824__auto____$1)
{return or__3824__auto____$1;
} else
{throw cljs.core.missing_protocol("IReifyTerm.-reify-term",v);
}
}
})().call(null,v,s);
}
});
cljs.core.logic.IWalkTerm = {};
cljs.core.logic._walk_term = (function _walk_term(v,s){
if((function (){var and__3822__auto__ = v;
if(and__3822__auto__)
{return v.cljs$core$logic$IWalkTerm$_walk_term$arity$2;
} else
{return and__3822__auto__;
}
})())
{return v.cljs$core$logic$IWalkTerm$_walk_term$arity$2(v,s);
} else
{var x__2373__auto__ = (((v == null))?null:v);
return (function (){var or__3824__auto__ = (cljs.core.logic._walk_term[goog.typeOf(x__2373__auto__)]);
if(or__3824__auto__)
{return or__3824__auto__;
} else
{var or__3824__auto____$1 = (cljs.core.logic._walk_term["_"]);
if(or__3824__auto____$1)
{return or__3824__auto____$1;
} else
{throw cljs.core.missing_protocol("IWalkTerm.-walk-term",v);
}
}
})().call(null,v,s);
}
});
cljs.core.logic.IOccursCheckTerm = {};
cljs.core.logic._occurs_check_term = (function _occurs_check_term(v,x,s){
if((function (){var and__3822__auto__ = v;
if(and__3822__auto__)
{return v.cljs$core$logic$IOccursCheckTerm$_occurs_check_term$arity$3;
} else
{return and__3822__auto__;
}
})())
{return v.cljs$core$logic$IOccursCheckTerm$_occurs_check_term$arity$3(v,x,s);
} else
{var x__2373__auto__ = (((v == null))?null:v);
return (function (){var or__3824__auto__ = (cljs.core.logic._occurs_check_term[goog.typeOf(x__2373__auto__)]);
if(or__3824__auto__)
{return or__3824__auto__;
} else
{var or__3824__auto____$1 = (cljs.core.logic._occurs_check_term["_"]);
if(or__3824__auto____$1)
{return or__3824__auto____$1;
} else
{throw cljs.core.missing_protocol("IOccursCheckTerm.-occurs-check-term",v);
}
}
})().call(null,v,x,s);
}
});
cljs.core.logic.IBuildTerm = {};
cljs.core.logic._build_term = (function _build_term(u,s){
if((function (){var and__3822__auto__ = u;
if(and__3822__auto__)
{return u.cljs$core$logic$IBuildTerm$_build_term$arity$2;
} else
{return and__3822__auto__;
}
})())
{return u.cljs$core$logic$IBuildTerm$_build_term$arity$2(u,s);
} else
{var x__2373__auto__ = (((u == null))?null:u);
return (function (){var or__3824__auto__ = (cljs.core.logic._build_term[goog.typeOf(x__2373__auto__)]);
if(or__3824__auto__)
{return or__3824__auto__;
} else
{var or__3824__auto____$1 = (cljs.core.logic._build_term["_"]);
if(or__3824__auto____$1)
{return or__3824__auto____$1;
} else
{throw cljs.core.missing_protocol("IBuildTerm.-build-term",u);
}
}
})().call(null,u,s);
}
});
cljs.core.logic.IBind = {};
cljs.core.logic._bind = (function _bind(this$,g){
if((function (){var and__3822__auto__ = this$;
if(and__3822__auto__)
{return this$.cljs$core$logic$IBind$_bind$arity$2;
} else
{return and__3822__auto__;
}
})())
{return this$.cljs$core$logic$IBind$_bind$arity$2(this$,g);
} else
{var x__2373__auto__ = (((this$ == null))?null:this$);
return (function (){var or__3824__auto__ = (cljs.core.logic._bind[goog.typeOf(x__2373__auto__)]);
if(or__3824__auto__)
{return or__3824__auto__;
} else
{var or__3824__auto____$1 = (cljs.core.logic._bind["_"]);
if(or__3824__auto____$1)
{return or__3824__auto____$1;
} else
{throw cljs.core.missing_protocol("IBind.-bind",this$);
}
}
})().call(null,this$,g);
}
});
cljs.core.logic.IMPlus = {};
cljs.core.logic._mplus = (function _mplus(a,f){
if((function (){var and__3822__auto__ = a;
if(and__3822__auto__)
{return a.cljs$core$logic$IMPlus$_mplus$arity$2;
} else
{return and__3822__auto__;
}
})())
{return a.cljs$core$logic$IMPlus$_mplus$arity$2(a,f);
} else
{var x__2373__auto__ = (((a == null))?null:a);
return (function (){var or__3824__auto__ = (cljs.core.logic._mplus[goog.typeOf(x__2373__auto__)]);
if(or__3824__auto__)
{return or__3824__auto__;
} else
{var or__3824__auto____$1 = (cljs.core.logic._mplus["_"]);
if(or__3824__auto____$1)
{return or__3824__auto____$1;
} else
{throw cljs.core.missing_protocol("IMPlus.-mplus",a);
}
}
})().call(null,a,f);
}
});
cljs.core.logic.ITake = {};
cljs.core.logic._take_STAR_ = (function _take_STAR_(a){
if((function (){var and__3822__auto__ = a;
if(and__3822__auto__)
{return a.cljs$core$logic$ITake$_take_STAR_$arity$1;
} else
{return and__3822__auto__;
}
})())
{return a.cljs$core$logic$ITake$_take_STAR_$arity$1(a);
} else
{var x__2373__auto__ = (((a == null))?null:a);
return (function (){var or__3824__auto__ = (cljs.core.logic._take_STAR_[goog.typeOf(x__2373__auto__)]);
if(or__3824__auto__)
{return or__3824__auto__;
} else
{var or__3824__auto____$1 = (cljs.core.logic._take_STAR_["_"]);
if(or__3824__auto____$1)
{return or__3824__auto____$1;
} else
{throw cljs.core.missing_protocol("ITake.-take*",a);
}
}
})().call(null,a);
}
});
cljs.core.logic.IPair = {};
cljs.core.logic._lhs = (function _lhs(this$){
if((function (){var and__3822__auto__ = this$;
if(and__3822__auto__)
{return this$.cljs$core$logic$IPair$_lhs$arity$1;
} else
{return and__3822__auto__;
}
})())
{return this$.cljs$core$logic$IPair$_lhs$arity$1(this$);
} else
{var x__2373__auto__ = (((this$ == null))?null:this$);
return (function (){var or__3824__auto__ = (cljs.core.logic._lhs[goog.typeOf(x__2373__auto__)]);
if(or__3824__auto__)
{return or__3824__auto__;
} else
{var or__3824__auto____$1 = (cljs.core.logic._lhs["_"]);
if(or__3824__auto____$1)
{return or__3824__auto____$1;
} else
{throw cljs.core.missing_protocol("IPair.-lhs",this$);
}
}
})().call(null,this$);
}
});
cljs.core.logic._rhs = (function _rhs(this$){
if((function (){var and__3822__auto__ = this$;
if(and__3822__auto__)
{return this$.cljs$core$logic$IPair$_rhs$arity$1;
} else
{return and__3822__auto__;
}
})())
{return this$.cljs$core$logic$IPair$_rhs$arity$1(this$);
} else
{var x__2373__auto__ = (((this$ == null))?null:this$);
return (function (){var or__3824__auto__ = (cljs.core.logic._rhs[goog.typeOf(x__2373__auto__)]);
if(or__3824__auto__)
{return or__3824__auto__;
} else
{var or__3824__auto____$1 = (cljs.core.logic._rhs["_"]);
if(or__3824__auto____$1)
{return or__3824__auto____$1;
} else
{throw cljs.core.missing_protocol("IPair.-rhs",this$);
}
}
})().call(null,this$);
}
});

goog.provide('cljs.core.logic.Pair');

/**
* @constructor
*/
cljs.core.logic.Pair = (function (lhs,rhs){
this.lhs = lhs;
this.rhs = rhs;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 2149580818;
})
cljs.core.logic.Pair.cljs$lang$type = true;
cljs.core.logic.Pair.cljs$lang$ctorPrSeq = (function (this__2315__auto__){
return cljs.core.list.cljs$lang$arity$1("cljs.core.logic/Pair");
});
cljs.core.logic.Pair.cljs$lang$ctorPrWriter = (function (this__2315__auto__,writer__2316__auto__){
return cljs.core._write(writer__2316__auto__,"cljs.core.logic/Pair");
});
cljs.core.logic.Pair.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (coll,writer,opts){
var self__ = this;
return cljs.core._write(writer,[cljs.core.str("("),cljs.core.str(self__.lhs),cljs.core.str(" . "),cljs.core.str(self__.rhs),cljs.core.str(")")].join(''));
});
cljs.core.logic.Pair.prototype.cljs$core$logic$IPair$ = true;
cljs.core.logic.Pair.prototype.cljs$core$logic$IPair$_lhs$arity$1 = (function (_){
var self__ = this;
return self__.lhs;
});
cljs.core.logic.Pair.prototype.cljs$core$logic$IPair$_rhs$arity$1 = (function (_){
var self__ = this;
return self__.rhs;
});
cljs.core.logic.Pair.prototype.cljs$core$IIndexed$_nth$arity$2 = (function (_,i){
var self__ = this;
var pred__3245 = cljs.core._EQ_;
var expr__3246 = i;
if((pred__3245.cljs$lang$arity$2 ? pred__3245.cljs$lang$arity$2(0,expr__3246) : pred__3245.call(null,0,expr__3246)))
{return self__.lhs;
} else
{if((pred__3245.cljs$lang$arity$2 ? pred__3245.cljs$lang$arity$2(1,expr__3246) : pred__3245.call(null,1,expr__3246)))
{return self__.rhs;
} else
{throw (new Error("Index out of bounds"));
}
}
});
cljs.core.logic.Pair.prototype.cljs$core$IIndexed$_nth$arity$3 = (function (_,i,not_found){
var self__ = this;
var pred__3248 = cljs.core._EQ_;
var expr__3249 = i;
if((pred__3248.cljs$lang$arity$2 ? pred__3248.cljs$lang$arity$2(0,expr__3249) : pred__3248.call(null,0,expr__3249)))
{return self__.lhs;
} else
{if((pred__3248.cljs$lang$arity$2 ? pred__3248.cljs$lang$arity$2(1,expr__3249) : pred__3248.call(null,1,expr__3249)))
{return self__.rhs;
} else
{return not_found;
}
}
});
cljs.core.logic.Pair.prototype.cljs$core$ICounted$_count$arity$1 = (function (_){
var self__ = this;
return 2;
});
cljs.core.logic.Pair.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this$,other){
var self__ = this;
var and__3822__auto__ = cljs.core._EQ_.cljs$lang$arity$2(self__.lhs,other.lhs);
if(and__3822__auto__)
{return cljs.core._EQ_.cljs$lang$arity$2(self__.rhs,other.rhs);
} else
{return and__3822__auto__;
}
});
cljs.core.logic.Pair;
cljs.core.logic.pair = (function pair(lhs,rhs){
return (new cljs.core.logic.Pair(lhs,rhs));
});
cljs.core.logic.ISubstitutions = {};
cljs.core.logic._occurs_check = (function _occurs_check(this$,u,v){
if((function (){var and__3822__auto__ = this$;
if(and__3822__auto__)
{return this$.cljs$core$logic$ISubstitutions$_occurs_check$arity$3;
} else
{return and__3822__auto__;
}
})())
{return this$.cljs$core$logic$ISubstitutions$_occurs_check$arity$3(this$,u,v);
} else
{var x__2373__auto__ = (((this$ == null))?null:this$);
return (function (){var or__3824__auto__ = (cljs.core.logic._occurs_check[goog.typeOf(x__2373__auto__)]);
if(or__3824__auto__)
{return or__3824__auto__;
} else
{var or__3824__auto____$1 = (cljs.core.logic._occurs_check["_"]);
if(or__3824__auto____$1)
{return or__3824__auto____$1;
} else
{throw cljs.core.missing_protocol("ISubstitutions.-occurs-check",this$);
}
}
})().call(null,this$,u,v);
}
});
cljs.core.logic._ext = (function _ext(this$,u,v){
if((function (){var and__3822__auto__ = this$;
if(and__3822__auto__)
{return this$.cljs$core$logic$ISubstitutions$_ext$arity$3;
} else
{return and__3822__auto__;
}
})())
{return this$.cljs$core$logic$ISubstitutions$_ext$arity$3(this$,u,v);
} else
{var x__2373__auto__ = (((this$ == null))?null:this$);
return (function (){var or__3824__auto__ = (cljs.core.logic._ext[goog.typeOf(x__2373__auto__)]);
if(or__3824__auto__)
{return or__3824__auto__;
} else
{var or__3824__auto____$1 = (cljs.core.logic._ext["_"]);
if(or__3824__auto____$1)
{return or__3824__auto____$1;
} else
{throw cljs.core.missing_protocol("ISubstitutions.-ext",this$);
}
}
})().call(null,this$,u,v);
}
});
cljs.core.logic._ext_no_check = (function _ext_no_check(this$,u,v){
if((function (){var and__3822__auto__ = this$;
if(and__3822__auto__)
{return this$.cljs$core$logic$ISubstitutions$_ext_no_check$arity$3;
} else
{return and__3822__auto__;
}
})())
{return this$.cljs$core$logic$ISubstitutions$_ext_no_check$arity$3(this$,u,v);
} else
{var x__2373__auto__ = (((this$ == null))?null:this$);
return (function (){var or__3824__auto__ = (cljs.core.logic._ext_no_check[goog.typeOf(x__2373__auto__)]);
if(or__3824__auto__)
{return or__3824__auto__;
} else
{var or__3824__auto____$1 = (cljs.core.logic._ext_no_check["_"]);
if(or__3824__auto____$1)
{return or__3824__auto____$1;
} else
{throw cljs.core.missing_protocol("ISubstitutions.-ext-no-check",this$);
}
}
})().call(null,this$,u,v);
}
});
cljs.core.logic._walk = (function _walk(this$,v){
if((function (){var and__3822__auto__ = this$;
if(and__3822__auto__)
{return this$.cljs$core$logic$ISubstitutions$_walk$arity$2;
} else
{return and__3822__auto__;
}
})())
{return this$.cljs$core$logic$ISubstitutions$_walk$arity$2(this$,v);
} else
{var x__2373__auto__ = (((this$ == null))?null:this$);
return (function (){var or__3824__auto__ = (cljs.core.logic._walk[goog.typeOf(x__2373__auto__)]);
if(or__3824__auto__)
{return or__3824__auto__;
} else
{var or__3824__auto____$1 = (cljs.core.logic._walk["_"]);
if(or__3824__auto____$1)
{return or__3824__auto____$1;
} else
{throw cljs.core.missing_protocol("ISubstitutions.-walk",this$);
}
}
})().call(null,this$,v);
}
});
cljs.core.logic._walk_STAR_ = (function _walk_STAR_(this$,v){
if((function (){var and__3822__auto__ = this$;
if(and__3822__auto__)
{return this$.cljs$core$logic$ISubstitutions$_walk_STAR_$arity$2;
} else
{return and__3822__auto__;
}
})())
{return this$.cljs$core$logic$ISubstitutions$_walk_STAR_$arity$2(this$,v);
} else
{var x__2373__auto__ = (((this$ == null))?null:this$);
return (function (){var or__3824__auto__ = (cljs.core.logic._walk_STAR_[goog.typeOf(x__2373__auto__)]);
if(or__3824__auto__)
{return or__3824__auto__;
} else
{var or__3824__auto____$1 = (cljs.core.logic._walk_STAR_["_"]);
if(or__3824__auto____$1)
{return or__3824__auto____$1;
} else
{throw cljs.core.missing_protocol("ISubstitutions.-walk*",this$);
}
}
})().call(null,this$,v);
}
});
cljs.core.logic._unify = (function _unify(this$,u,v){
if((function (){var and__3822__auto__ = this$;
if(and__3822__auto__)
{return this$.cljs$core$logic$ISubstitutions$_unify$arity$3;
} else
{return and__3822__auto__;
}
})())
{return this$.cljs$core$logic$ISubstitutions$_unify$arity$3(this$,u,v);
} else
{var x__2373__auto__ = (((this$ == null))?null:this$);
return (function (){var or__3824__auto__ = (cljs.core.logic._unify[goog.typeOf(x__2373__auto__)]);
if(or__3824__auto__)
{return or__3824__auto__;
} else
{var or__3824__auto____$1 = (cljs.core.logic._unify["_"]);
if(or__3824__auto____$1)
{return or__3824__auto____$1;
} else
{throw cljs.core.missing_protocol("ISubstitutions.-unify",this$);
}
}
})().call(null,this$,u,v);
}
});
cljs.core.logic._reify_lvar_name = (function _reify_lvar_name(_){
if((function (){var and__3822__auto__ = _;
if(and__3822__auto__)
{return _.cljs$core$logic$ISubstitutions$_reify_lvar_name$arity$1;
} else
{return and__3822__auto__;
}
})())
{return _.cljs$core$logic$ISubstitutions$_reify_lvar_name$arity$1(_);
} else
{var x__2373__auto__ = (((_ == null))?null:_);
return (function (){var or__3824__auto__ = (cljs.core.logic._reify_lvar_name[goog.typeOf(x__2373__auto__)]);
if(or__3824__auto__)
{return or__3824__auto__;
} else
{var or__3824__auto____$1 = (cljs.core.logic._reify_lvar_name["_"]);
if(or__3824__auto____$1)
{return or__3824__auto____$1;
} else
{throw cljs.core.missing_protocol("ISubstitutions.-reify-lvar-name",_);
}
}
})().call(null,_);
}
});
cljs.core.logic._reify_STAR_ = (function _reify_STAR_(this$,v){
if((function (){var and__3822__auto__ = this$;
if(and__3822__auto__)
{return this$.cljs$core$logic$ISubstitutions$_reify_STAR_$arity$2;
} else
{return and__3822__auto__;
}
})())
{return this$.cljs$core$logic$ISubstitutions$_reify_STAR_$arity$2(this$,v);
} else
{var x__2373__auto__ = (((this$ == null))?null:this$);
return (function (){var or__3824__auto__ = (cljs.core.logic._reify_STAR_[goog.typeOf(x__2373__auto__)]);
if(or__3824__auto__)
{return or__3824__auto__;
} else
{var or__3824__auto____$1 = (cljs.core.logic._reify_STAR_["_"]);
if(or__3824__auto____$1)
{return or__3824__auto____$1;
} else
{throw cljs.core.missing_protocol("ISubstitutions.-reify*",this$);
}
}
})().call(null,this$,v);
}
});
cljs.core.logic._reify = (function _reify(this$,v){
if((function (){var and__3822__auto__ = this$;
if(and__3822__auto__)
{return this$.cljs$core$logic$ISubstitutions$_reify$arity$2;
} else
{return and__3822__auto__;
}
})())
{return this$.cljs$core$logic$ISubstitutions$_reify$arity$2(this$,v);
} else
{var x__2373__auto__ = (((this$ == null))?null:this$);
return (function (){var or__3824__auto__ = (cljs.core.logic._reify[goog.typeOf(x__2373__auto__)]);
if(or__3824__auto__)
{return or__3824__auto__;
} else
{var or__3824__auto____$1 = (cljs.core.logic._reify["_"]);
if(or__3824__auto____$1)
{return or__3824__auto____$1;
} else
{throw cljs.core.missing_protocol("ISubstitutions.-reify",this$);
}
}
})().call(null,this$,v);
}
});
cljs.core.logic.not_found = {};
/**
* Similar to Scheme assq, xs must be a List of Pairs
*/
cljs.core.logic.assq = (function assq(k,xs){
var xs__$1 = xs.cljs$core$ISeqable$_seq$arity$1(xs);
while(true){
if((xs__$1 == null))
{return cljs.core.logic.not_found;
} else
{var xs__$2 = xs__$1;
var x = xs__$2.cljs$core$ISeq$_first$arity$1(xs__$2);
var lhs = x.lhs;
if((k === lhs))
{return x.rhs;
} else
{{
var G__3251 = xs__$2.cljs$core$INext$_next$arity$1(xs__$2);
xs__$1 = G__3251;
continue;
}
}
}
break;
}
});

goog.provide('cljs.core.logic.Substitutions');

/**
* @constructor
*/
cljs.core.logic.Substitutions = (function (s){
this.s = s;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 2149580800;
})
cljs.core.logic.Substitutions.cljs$lang$type = true;
cljs.core.logic.Substitutions.cljs$lang$ctorPrSeq = (function (this__2315__auto__){
return cljs.core.list.cljs$lang$arity$1("cljs.core.logic/Substitutions");
});
cljs.core.logic.Substitutions.cljs$lang$ctorPrWriter = (function (this__2315__auto__,writer__2316__auto__){
return cljs.core._write(writer__2316__auto__,"cljs.core.logic/Substitutions");
});
cljs.core.logic.Substitutions.prototype.cljs$core$logic$ITake$ = true;
cljs.core.logic.Substitutions.prototype.cljs$core$logic$ITake$_take_STAR_$arity$1 = (function (this$){
var self__ = this;
return this$;
});
cljs.core.logic.Substitutions.prototype.cljs$core$logic$IMPlus$ = true;
cljs.core.logic.Substitutions.prototype.cljs$core$logic$IMPlus$_mplus$arity$2 = (function (this$,f){
var self__ = this;
return (cljs.core.logic.choice.cljs$lang$arity$2 ? cljs.core.logic.choice.cljs$lang$arity$2(this$,f) : cljs.core.logic.choice.call(null,this$,f));
});
cljs.core.logic.Substitutions.prototype.cljs$core$logic$IBind$ = true;
cljs.core.logic.Substitutions.prototype.cljs$core$logic$IBind$_bind$arity$2 = (function (this$,g){
var self__ = this;
return (g.cljs$lang$arity$1 ? g.cljs$lang$arity$1(this$) : g.call(null,this$));
});
cljs.core.logic.Substitutions.prototype.cljs$core$logic$ISubstitutions$ = true;
cljs.core.logic.Substitutions.prototype.cljs$core$logic$ISubstitutions$_walk$arity$2 = (function (this$,v){
var self__ = this;
if(cljs.core.truth_((cljs.core.logic.lvar_QMARK_.cljs$lang$arity$1 ? cljs.core.logic.lvar_QMARK_.cljs$lang$arity$1(v) : cljs.core.logic.lvar_QMARK_.call(null,v))))
{var rhs = cljs.core.logic.assq(v,self__.s);
var vp = this$.cljs$core$logic$ISubstitutions$_walk$arity$2(this$,rhs);
if((cljs.core.logic.not_found === vp))
{return v;
} else
{return vp;
}
} else
{if("\uFDD0'else")
{return v;
} else
{return null;
}
}
});
cljs.core.logic.Substitutions.prototype.cljs$core$logic$ISubstitutions$_reify_STAR_$arity$2 = (function (this$,v){
var self__ = this;
var v__$1 = this$.cljs$core$logic$ISubstitutions$_walk$arity$2(this$,v);
return cljs.core.logic._reify_term(v__$1,this$);
});
cljs.core.logic.Substitutions.prototype.cljs$core$logic$ISubstitutions$_walk_STAR_$arity$2 = (function (this$,v){
var self__ = this;
var v__$1 = this$.cljs$core$logic$ISubstitutions$_walk$arity$2(this$,v);
return cljs.core.logic._walk_term(v__$1,this$);
});
cljs.core.logic.Substitutions.prototype.cljs$core$logic$ISubstitutions$_reify_lvar_name$arity$1 = (function (this$){
var self__ = this;
return cljs.core.symbol.cljs$lang$arity$1([cljs.core.str("_."),cljs.core.str(cljs.core.count(self__.s))].join(''));
});
cljs.core.logic.Substitutions.prototype.cljs$core$logic$ISubstitutions$_reify$arity$2 = (function (this$,v){
var self__ = this;
var v__$1 = this$.cljs$core$logic$ISubstitutions$_walk_STAR_$arity$2(this$,v);
return cljs.core.logic._walk_STAR_(cljs.core.logic._reify_STAR_(cljs.core.logic.empty_s,v__$1),v__$1);
});
cljs.core.logic.Substitutions.prototype.cljs$core$logic$ISubstitutions$_unify$arity$3 = (function (this$,u,v){
var self__ = this;
if((u === v))
{return this$;
} else
{var u__$1 = this$.cljs$core$logic$ISubstitutions$_walk$arity$2(this$,u);
var v__$1 = this$.cljs$core$logic$ISubstitutions$_walk$arity$2(this$,v);
if((u__$1 === v__$1))
{return this$;
} else
{return cljs.core.logic._unify_terms(u__$1,v__$1,this$);
}
}
});
cljs.core.logic.Substitutions.prototype.cljs$core$logic$ISubstitutions$_ext$arity$3 = (function (this$,u,v){
var self__ = this;
if(cljs.core.truth_((function (){var and__3822__auto__ = cljs.core.logic._STAR_occurs_check_STAR_;
if(cljs.core.truth_(and__3822__auto__))
{return this$.cljs$core$logic$ISubstitutions$_occurs_check$arity$3(this$,u,v);
} else
{return and__3822__auto__;
}
})()))
{return null;
} else
{return this$.cljs$core$logic$ISubstitutions$_ext_no_check$arity$3(this$,u,v);
}
});
cljs.core.logic.Substitutions.prototype.cljs$core$logic$ISubstitutions$_ext_no_check$arity$3 = (function (this$,u,v){
var self__ = this;
return (new cljs.core.logic.Substitutions(cljs.core.conj.cljs$lang$arity$2(self__.s,(new cljs.core.logic.Pair(u,v)))));
});
cljs.core.logic.Substitutions.prototype.cljs$core$logic$ISubstitutions$_occurs_check$arity$3 = (function (this$,u,v){
var self__ = this;
var v__$1 = this$.cljs$core$logic$ISubstitutions$_walk$arity$2(this$,v);
return cljs.core.logic._occurs_check_term(v__$1,u,this$);
});
cljs.core.logic.Substitutions.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this$,writer,opts){
var self__ = this;
return cljs.core._pr_writer(self__.s,writer,opts);
});
cljs.core.logic.Substitutions.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this$,o){
var self__ = this;
var or__3824__auto__ = (this$ === o);
if(or__3824__auto__)
{return or__3824__auto__;
} else
{var and__3822__auto__ = cljs.core.instance_QMARK_(cljs.core.logic.Substitutions,o);
if(and__3822__auto__)
{return cljs.core._EQ_.cljs$lang$arity$2(self__.s,o.s);
} else
{return and__3822__auto__;
}
}
});
cljs.core.logic.Substitutions;
cljs.core.logic.make_s = (function make_s(s){
return (new cljs.core.logic.Substitutions(s));
});
cljs.core.logic.empty_s = cljs.core.logic.make_s(cljs.core.List.EMPTY);
cljs.core.logic.subst_QMARK_ = (function subst_QMARK_(x){
return cljs.core.instance_QMARK_(cljs.core.logic.Substitutions,x);
});
cljs.core.logic.to_s = (function to_s(v){
var s = cljs.core.reduce.cljs$lang$arity$3((function (l,p__3254){
var vec__3255 = p__3254;
var k = cljs.core.nth.cljs$lang$arity$3(vec__3255,0,null);
var v__$1 = cljs.core.nth.cljs$lang$arity$3(vec__3255,1,null);
return cljs.core.conj.cljs$lang$arity$2(l,(cljs.core.logic.pair.cljs$lang$arity$2 ? cljs.core.logic.pair.cljs$lang$arity$2(k,v__$1) : cljs.core.logic.pair.call(null,k,v__$1)));
}),cljs.core.List.EMPTY,v);
return cljs.core.logic.make_s(s);
});

goog.provide('cljs.core.logic.LVar');

/**
* @constructor
*/
cljs.core.logic.LVar = (function (name,meta){
this.name = name;
this.meta = meta;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 2154168320;
})
cljs.core.logic.LVar.cljs$lang$type = true;
cljs.core.logic.LVar.cljs$lang$ctorPrSeq = (function (this__2315__auto__){
return cljs.core.list.cljs$lang$arity$1("cljs.core.logic/LVar");
});
cljs.core.logic.LVar.cljs$lang$ctorPrWriter = (function (this__2315__auto__,writer__2316__auto__){
return cljs.core._write(writer__2316__auto__,"cljs.core.logic/LVar");
});
cljs.core.logic.LVar.prototype.cljs$core$IHash$_hash$arity$1 = (function (this$){
var self__ = this;
return cljs.core._hash(self__.name);
});
cljs.core.logic.LVar.prototype.cljs$core$logic$IUnifyWithLVar$ = true;
cljs.core.logic.LVar.prototype.cljs$core$logic$IUnifyWithLVar$_unify_with_lvar$arity$3 = (function (v,u,s){
var self__ = this;
return cljs.core.logic._ext_no_check(s,u,v);
});
cljs.core.logic.LVar.prototype.cljs$core$logic$IUnifyWithSequential$ = true;
cljs.core.logic.LVar.prototype.cljs$core$logic$IUnifyWithSequential$_unify_with_seq$arity$3 = (function (v,u,s){
var self__ = this;
return cljs.core.logic._ext(s,v,u);
});
cljs.core.logic.LVar.prototype.cljs$core$logic$IReifyTerm$ = true;
cljs.core.logic.LVar.prototype.cljs$core$logic$IReifyTerm$_reify_term$arity$2 = (function (v,s){
var self__ = this;
return cljs.core.logic._ext(s,v,cljs.core.logic._reify_lvar_name(s));
});
cljs.core.logic.LVar.prototype.cljs$core$logic$IUnifyTerms$ = true;
cljs.core.logic.LVar.prototype.cljs$core$logic$IUnifyTerms$_unify_terms$arity$3 = (function (u,v,s){
var self__ = this;
return cljs.core.logic._unify_with_lvar(v,u,s);
});
cljs.core.logic.LVar.prototype.cljs$core$logic$IUnifyWithNil$ = true;
cljs.core.logic.LVar.prototype.cljs$core$logic$IUnifyWithNil$_unify_with_nil$arity$3 = (function (v,u,s){
var self__ = this;
return cljs.core.logic._ext_no_check(s,v,u);
});
cljs.core.logic.LVar.prototype.cljs$core$logic$IUnifyWithMap$ = true;
cljs.core.logic.LVar.prototype.cljs$core$logic$IUnifyWithMap$_unify_with_map$arity$3 = (function (v,u,s){
var self__ = this;
return cljs.core.logic._ext(s,v,u);
});
cljs.core.logic.LVar.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (_,writer,opts){
var self__ = this;
return cljs.core._write(writer,[cljs.core.str("<lvar:"),cljs.core.str(self__.name),cljs.core.str(">")].join(''));
});
cljs.core.logic.LVar.prototype.cljs$core$logic$IOccursCheckTerm$ = true;
cljs.core.logic.LVar.prototype.cljs$core$logic$IOccursCheckTerm$_occurs_check_term$arity$3 = (function (v,x,s){
var self__ = this;
return cljs.core._EQ_.cljs$lang$arity$2(cljs.core.logic._walk(s,v),x);
});
cljs.core.logic.LVar.prototype.toString = (function (){
var self__ = this;
var this$ = this;
return cljs.core.pr_str.cljs$lang$arity$variadic(cljs.core.array_seq([this$], 0));
});
cljs.core.logic.LVar.prototype.cljs$core$logic$IUnifyWithSet$ = true;
cljs.core.logic.LVar.prototype.cljs$core$logic$IUnifyWithSet$_unify_with_set$arity$3 = (function (v,u,s){
var self__ = this;
return cljs.core.logic._ext(s,v,u);
});
cljs.core.logic.LVar.prototype.cljs$core$logic$IWalkTerm$ = true;
cljs.core.logic.LVar.prototype.cljs$core$logic$IWalkTerm$_walk_term$arity$2 = (function (v,s){
var self__ = this;
return v;
});
cljs.core.logic.LVar.prototype.cljs$core$logic$IUnifyWithObject$ = true;
cljs.core.logic.LVar.prototype.cljs$core$logic$IUnifyWithObject$_unify_with_object$arity$3 = (function (v,u,s){
var self__ = this;
return cljs.core.logic._ext(s,v,u);
});
cljs.core.logic.LVar.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this$,o){
var self__ = this;
var and__3822__auto__ = cljs.core.instance_QMARK_(cljs.core.logic.LVar,o);
if(and__3822__auto__)
{var o__$1 = o;
return (self__.name === o__$1.name);
} else
{return and__3822__auto__;
}
});
cljs.core.logic.LVar.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this$,new_meta){
var self__ = this;
return (new cljs.core.logic.LVar(self__.name,self__.meta));
});
cljs.core.logic.LVar.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this$){
var self__ = this;
return self__.meta;
});
cljs.core.logic.LVar.prototype.cljs$core$logic$IUnifyWithLSeq$ = true;
cljs.core.logic.LVar.prototype.cljs$core$logic$IUnifyWithLSeq$_unify_with_lseq$arity$3 = (function (v,u,s){
var self__ = this;
return cljs.core.logic._ext(s,v,u);
});
cljs.core.logic.LVar;
cljs.core.logic.lvar_sym_counter = cljs.core.atom.cljs$lang$arity$1(0);
cljs.core.logic.lvar = (function() {
var lvar = null;
var lvar__0 = (function (){
return lvar.cljs$lang$arity$1("\uFDD1'gen");
});
var lvar__1 = (function (name){
var name__$1 = name.substring(2,name.length) + '_' + cljs.core.swap_BANG_.cljs$lang$arity$2(cljs.core.logic.lvar_sym_counter,cljs.core.inc);
return (new cljs.core.logic.LVar(name__$1,null));
});
lvar = function(name){
switch(arguments.length){
case 0:
return lvar__0.call(this);
case 1:
return lvar__1.call(this,name);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
lvar.cljs$lang$arity$0 = lvar__0;
lvar.cljs$lang$arity$1 = lvar__1;
return lvar;
})()
;
cljs.core.logic.lvar_QMARK_ = (function lvar_QMARK_(x){
return cljs.core.instance_QMARK_(cljs.core.logic.LVar,x);
});
cljs.core.logic.LConsSeq = {};
cljs.core.logic._lfirst = (function _lfirst(this$){
if((function (){var and__3822__auto__ = this$;
if(and__3822__auto__)
{return this$.cljs$core$logic$LConsSeq$_lfirst$arity$1;
} else
{return and__3822__auto__;
}
})())
{return this$.cljs$core$logic$LConsSeq$_lfirst$arity$1(this$);
} else
{var x__2373__auto__ = (((this$ == null))?null:this$);
return (function (){var or__3824__auto__ = (cljs.core.logic._lfirst[goog.typeOf(x__2373__auto__)]);
if(or__3824__auto__)
{return or__3824__auto__;
} else
{var or__3824__auto____$1 = (cljs.core.logic._lfirst["_"]);
if(or__3824__auto____$1)
{return or__3824__auto____$1;
} else
{throw cljs.core.missing_protocol("LConsSeq.-lfirst",this$);
}
}
})().call(null,this$);
}
});
cljs.core.logic._lnext = (function _lnext(this$){
if((function (){var and__3822__auto__ = this$;
if(and__3822__auto__)
{return this$.cljs$core$logic$LConsSeq$_lnext$arity$1;
} else
{return and__3822__auto__;
}
})())
{return this$.cljs$core$logic$LConsSeq$_lnext$arity$1(this$);
} else
{var x__2373__auto__ = (((this$ == null))?null:this$);
return (function (){var or__3824__auto__ = (cljs.core.logic._lnext[goog.typeOf(x__2373__auto__)]);
if(or__3824__auto__)
{return or__3824__auto__;
} else
{var or__3824__auto____$1 = (cljs.core.logic._lnext["_"]);
if(or__3824__auto____$1)
{return or__3824__auto____$1;
} else
{throw cljs.core.missing_protocol("LConsSeq.-lnext",this$);
}
}
})().call(null,this$);
}
});
cljs.core.logic.lcons_pr_seq = (function lcons_pr_seq(x){
if(cljs.core.truth_((cljs.core.logic.lcons_QMARK_.cljs$lang$arity$1 ? cljs.core.logic.lcons_QMARK_.cljs$lang$arity$1(x) : cljs.core.logic.lcons_QMARK_.call(null,x))))
{return (new cljs.core.LazySeq(null,false,(function (){
return cljs.core.cons(cljs.core.logic._lfirst(x),lcons_pr_seq(cljs.core.logic._lnext(x)));
}),null));
} else
{if("\uFDD0'else")
{return cljs.core.list.cljs$lang$arity$2("\uFDD1'.",x);
} else
{return null;
}
}
});

goog.provide('cljs.core.logic.LCons');

/**
* @constructor
*/
cljs.core.logic.LCons = (function (a,d,meta){
this.a = a;
this.d = d;
this.meta = meta;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 2149974016;
})
cljs.core.logic.LCons.cljs$lang$type = true;
cljs.core.logic.LCons.cljs$lang$ctorPrSeq = (function (this__2315__auto__){
return cljs.core.list.cljs$lang$arity$1("cljs.core.logic/LCons");
});
cljs.core.logic.LCons.cljs$lang$ctorPrWriter = (function (this__2315__auto__,writer__2316__auto__){
return cljs.core._write(writer__2316__auto__,"cljs.core.logic/LCons");
});
cljs.core.logic.LCons.prototype.cljs$core$logic$IUnifyWithSequential$ = true;
cljs.core.logic.LCons.prototype.cljs$core$logic$IUnifyWithSequential$_unify_with_seq$arity$3 = (function (v,u,s){
var self__ = this;
return cljs.core.logic._unify_with_lseq(u,v,s);
});
cljs.core.logic.LCons.prototype.cljs$core$logic$IReifyTerm$ = true;
cljs.core.logic.LCons.prototype.cljs$core$logic$IReifyTerm$_reify_term$arity$2 = (function (v,s){
var self__ = this;
var v__$1 = v;
var s__$1 = s;
while(true){
if(cljs.core.truth_((cljs.core.logic.lcons_QMARK_.cljs$lang$arity$1 ? cljs.core.logic.lcons_QMARK_.cljs$lang$arity$1(v__$1) : cljs.core.logic.lcons_QMARK_.call(null,v__$1))))
{{
var G__3256 = v__$1.cljs$core$logic$LConsSeq$_lnext$arity$1(v__$1);
var G__3257 = cljs.core.logic._reify_STAR_(s__$1,v__$1.cljs$core$logic$LConsSeq$_lfirst$arity$1(v__$1));
v__$1 = G__3256;
s__$1 = G__3257;
continue;
}
} else
{return cljs.core.logic._reify_STAR_(s__$1,v__$1);
}
break;
}
});
cljs.core.logic.LCons.prototype.cljs$core$logic$IUnifyTerms$ = true;
cljs.core.logic.LCons.prototype.cljs$core$logic$IUnifyTerms$_unify_terms$arity$3 = (function (u,v,s){
var self__ = this;
return cljs.core.logic._unify_with_lseq(v,u,s);
});
cljs.core.logic.LCons.prototype.cljs$core$logic$IUnifyWithNil$ = true;
cljs.core.logic.LCons.prototype.cljs$core$logic$IUnifyWithNil$_unify_with_nil$arity$3 = (function (v,u,s){
var self__ = this;
return false;
});
cljs.core.logic.LCons.prototype.cljs$core$logic$IUnifyWithMap$ = true;
cljs.core.logic.LCons.prototype.cljs$core$logic$IUnifyWithMap$_unify_with_map$arity$3 = (function (v,u,s){
var self__ = this;
return false;
});
cljs.core.logic.LCons.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this$,writer,opts){
var self__ = this;
return cljs.core.pr_sequential_writer(writer,cljs.core.pr_writer,"("," ",")",opts,cljs.core.logic.lcons_pr_seq(this$));
});
cljs.core.logic.LCons.prototype.cljs$core$logic$IOccursCheckTerm$ = true;
cljs.core.logic.LCons.prototype.cljs$core$logic$IOccursCheckTerm$_occurs_check_term$arity$3 = (function (v,x,s){
var self__ = this;
var v__$1 = v;
var x__$1 = x;
var s__$1 = s;
while(true){
if(cljs.core.truth_((cljs.core.logic.lcons_QMARK_.cljs$lang$arity$1 ? cljs.core.logic.lcons_QMARK_.cljs$lang$arity$1(v__$1) : cljs.core.logic.lcons_QMARK_.call(null,v__$1))))
{var or__3824__auto__ = cljs.core.logic._occurs_check(s__$1,x__$1,v__$1.cljs$core$logic$LConsSeq$_lfirst$arity$1(v__$1));
if(cljs.core.truth_(or__3824__auto__))
{return or__3824__auto__;
} else
{{
var G__3258 = v__$1.cljs$core$logic$LConsSeq$_lnext$arity$1(v__$1);
var G__3259 = x__$1;
var G__3260 = s__$1;
v__$1 = G__3258;
x__$1 = G__3259;
s__$1 = G__3260;
continue;
}
}
} else
{return cljs.core.logic._occurs_check(s__$1,x__$1,v__$1);
}
break;
}
});
cljs.core.logic.LCons.prototype.cljs$core$logic$IUnifyWithSet$ = true;
cljs.core.logic.LCons.prototype.cljs$core$logic$IUnifyWithSet$_unify_with_set$arity$3 = (function (v,u,s){
var self__ = this;
return false;
});
cljs.core.logic.LCons.prototype.cljs$core$logic$IWalkTerm$ = true;
cljs.core.logic.LCons.prototype.cljs$core$logic$IWalkTerm$_walk_term$arity$2 = (function (v,s){
var self__ = this;
return (cljs.core.logic.lcons.cljs$lang$arity$2 ? cljs.core.logic.lcons.cljs$lang$arity$2(cljs.core.logic._walk_STAR_(s,v.cljs$core$logic$LConsSeq$_lfirst$arity$1(v)),cljs.core.logic._walk_STAR_(s,v.cljs$core$logic$LConsSeq$_lnext$arity$1(v))) : cljs.core.logic.lcons.call(null,cljs.core.logic._walk_STAR_(s,v.cljs$core$logic$LConsSeq$_lfirst$arity$1(v)),cljs.core.logic._walk_STAR_(s,v.cljs$core$logic$LConsSeq$_lnext$arity$1(v))));
});
cljs.core.logic.LCons.prototype.cljs$core$logic$IUnifyWithObject$ = true;
cljs.core.logic.LCons.prototype.cljs$core$logic$IUnifyWithObject$_unify_with_object$arity$3 = (function (v,u,s){
var self__ = this;
return false;
});
cljs.core.logic.LCons.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this$,o){
var self__ = this;
var or__3824__auto__ = (this$ === o);
if(or__3824__auto__)
{return or__3824__auto__;
} else
{var and__3822__auto__ = cljs.core.instance_QMARK_(cljs.core.logic.LCons,o);
if(and__3822__auto__)
{var me = this$;
var you = o;
while(true){
if((me == null))
{return (you == null);
} else
{if(cljs.core.logic.lvar_QMARK_(me))
{return true;
} else
{if(cljs.core.logic.lvar_QMARK_(you))
{return true;
} else
{if(cljs.core.truth_((function (){var and__3822__auto____$1 = (cljs.core.logic.lcons_QMARK_.cljs$lang$arity$1 ? cljs.core.logic.lcons_QMARK_.cljs$lang$arity$1(me) : cljs.core.logic.lcons_QMARK_.call(null,me));
if(cljs.core.truth_(and__3822__auto____$1))
{return (cljs.core.logic.lcons_QMARK_.cljs$lang$arity$1 ? cljs.core.logic.lcons_QMARK_.cljs$lang$arity$1(you) : cljs.core.logic.lcons_QMARK_.call(null,you));
} else
{return and__3822__auto____$1;
}
})()))
{var mef = me.cljs$core$logic$LConsSeq$_lfirst$arity$1(me);
var youf = cljs.core.logic._lfirst(you);
var and__3822__auto____$1 = (function (){var or__3824__auto____$1 = cljs.core._EQ_.cljs$lang$arity$2(mef,youf);
if(or__3824__auto____$1)
{return or__3824__auto____$1;
} else
{var or__3824__auto____$2 = cljs.core.logic.lvar_QMARK_(mef);
if(or__3824__auto____$2)
{return or__3824__auto____$2;
} else
{return cljs.core.logic.lvar_QMARK_(youf);
}
}
})();
if(cljs.core.truth_(and__3822__auto____$1))
{{
var G__3261 = me.cljs$core$logic$LConsSeq$_lnext$arity$1(me);
var G__3262 = cljs.core.logic._lnext(you);
me = G__3261;
you = G__3262;
continue;
}
} else
{return and__3822__auto____$1;
}
} else
{if("\uFDD0'else")
{return cljs.core._EQ_.cljs$lang$arity$2(me,you);
} else
{return null;
}
}
}
}
}
break;
}
} else
{return and__3822__auto__;
}
}
});
cljs.core.logic.LCons.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this$,new_meta){
var self__ = this;
return (new cljs.core.logic.LCons(self__.a,self__.d,new_meta));
});
cljs.core.logic.LCons.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this$){
var self__ = this;
return self__.meta;
});
cljs.core.logic.LCons.prototype.cljs$core$logic$LConsSeq$ = true;
cljs.core.logic.LCons.prototype.cljs$core$logic$LConsSeq$_lfirst$arity$1 = (function (_){
var self__ = this;
return self__.a;
});
cljs.core.logic.LCons.prototype.cljs$core$logic$LConsSeq$_lnext$arity$1 = (function (_){
var self__ = this;
return self__.d;
});
cljs.core.logic.LCons.prototype.cljs$core$logic$IUnifyWithLSeq$ = true;
cljs.core.logic.LCons.prototype.cljs$core$logic$IUnifyWithLSeq$_unify_with_lseq$arity$3 = (function (v,u,s){
var self__ = this;
var u__$1 = u;
var v__$1 = v;
var s__$1 = s;
while(true){
if(cljs.core.logic.lvar_QMARK_(u__$1))
{return cljs.core.logic._unify(s__$1,u__$1,v__$1);
} else
{if(cljs.core.logic.lvar_QMARK_(v__$1))
{return cljs.core.logic._unify(s__$1,v__$1,u__$1);
} else
{if(cljs.core.truth_((function (){var and__3822__auto__ = (cljs.core.logic.lcons_QMARK_.cljs$lang$arity$1 ? cljs.core.logic.lcons_QMARK_.cljs$lang$arity$1(u__$1) : cljs.core.logic.lcons_QMARK_.call(null,u__$1));
if(cljs.core.truth_(and__3822__auto__))
{return (cljs.core.logic.lcons_QMARK_.cljs$lang$arity$1 ? cljs.core.logic.lcons_QMARK_.cljs$lang$arity$1(v__$1) : cljs.core.logic.lcons_QMARK_.call(null,v__$1));
} else
{return and__3822__auto__;
}
})()))
{var temp__3971__auto__ = cljs.core.logic._unify(s__$1,cljs.core.logic._lfirst(u__$1),v__$1.cljs$core$logic$LConsSeq$_lfirst$arity$1(v__$1));
if(cljs.core.truth_(temp__3971__auto__))
{var s__$2 = temp__3971__auto__;
{
var G__3263 = cljs.core.logic._lnext(u__$1);
var G__3264 = v__$1.cljs$core$logic$LConsSeq$_lnext$arity$1(v__$1);
var G__3265 = s__$2;
u__$1 = G__3263;
v__$1 = G__3264;
s__$1 = G__3265;
continue;
}
} else
{return false;
}
} else
{if("\uFDD0'else")
{return cljs.core.logic._unify(s__$1,u__$1,v__$1);
} else
{return null;
}
}
}
}
break;
}
});
cljs.core.logic.LCons;
/**
* Constructs a sequence a with an improper tail d if d is a logic variable.
*/
cljs.core.logic.lcons = (function lcons(a,d){
if((function (){var or__3824__auto__ = cljs.core.coll_QMARK_(d);
if(or__3824__auto__)
{return or__3824__auto__;
} else
{return (d == null);
}
})())
{return cljs.core.cons(a,cljs.core.seq(d));
} else
{return (new cljs.core.logic.LCons(a,d,null));
}
});
cljs.core.logic.lcons_QMARK_ = (function lcons_QMARK_(x){
return cljs.core.instance_QMARK_(cljs.core.logic.LCons,x);
});
cljs.core.PersistentHashSet.prototype.cljs$core$logic$IUnifyTerms$ = true;
cljs.core.PersistentHashSet.prototype.cljs$core$logic$IUnifyTerms$_unify_terms$arity$3 = (function (u,v,s){
return cljs.core.logic._unify_with_set(v,u,s);
});
cljs.core.PersistentHashMap.prototype.cljs$core$logic$IUnifyTerms$ = true;
cljs.core.PersistentHashMap.prototype.cljs$core$logic$IUnifyTerms$_unify_terms$arity$3 = (function (u,v,s){
return cljs.core.logic._unify_with_map(v,u,s);
});
cljs.core.PersistentArrayMap.prototype.cljs$core$logic$IUnifyTerms$ = true;
cljs.core.PersistentArrayMap.prototype.cljs$core$logic$IUnifyTerms$_unify_terms$arity$3 = (function (u,v,s){
return cljs.core.logic._unify_with_map(v,u,s);
});
cljs.core.ObjMap.prototype.cljs$core$logic$IUnifyTerms$ = true;
cljs.core.ObjMap.prototype.cljs$core$logic$IUnifyTerms$_unify_terms$arity$3 = (function (u,v,s){
return cljs.core.logic._unify_with_map(v,u,s);
});
(cljs.core.logic.IUnifyTerms["_"] = true);
(cljs.core.logic._unify_terms["_"] = (function (u,v,s){
if(cljs.core.sequential_QMARK_(u))
{return cljs.core.logic._unify_with_seq(v,u,s);
} else
{return cljs.core.logic._unify_with_object(v,u,s);
}
}));
(cljs.core.logic.IUnifyTerms["null"] = true);
(cljs.core.logic._unify_terms["null"] = (function (u,v,s){
return cljs.core.logic._unify_with_nil(v,u,s);
}));
(cljs.core.logic.IUnifyWithNil["_"] = true);
(cljs.core.logic._unify_with_nil["_"] = (function (v,u,s){
return false;
}));
(cljs.core.logic.IUnifyWithNil["null"] = true);
(cljs.core.logic._unify_with_nil["null"] = (function (v,u,s){
return s;
}));
(cljs.core.logic.IUnifyWithObject["_"] = true);
(cljs.core.logic._unify_with_object["_"] = (function (v,u,s){
if(cljs.core._EQ_.cljs$lang$arity$2(u,v))
{return s;
} else
{return false;
}
}));
(cljs.core.logic.IUnifyWithObject["null"] = true);
(cljs.core.logic._unify_with_object["null"] = (function (v,u,s){
return false;
}));
(cljs.core.logic.IUnifyWithLVar["_"] = true);
(cljs.core.logic._unify_with_lvar["_"] = (function (v,u,s){
return cljs.core.logic._ext(s,u,v);
}));
(cljs.core.logic.IUnifyWithLVar["null"] = true);
(cljs.core.logic._unify_with_lvar["null"] = (function (v,u,s){
return cljs.core.logic._ext_no_check(s,u,v);
}));
(cljs.core.logic.IUnifyWithLSeq["_"] = true);
(cljs.core.logic._unify_with_lseq["_"] = (function (v,u,s){
if(cljs.core.sequential_QMARK_(v))
{var u__$1 = u;
var v__$1 = v;
var s__$1 = s;
while(true){
if(cljs.core.seq(v__$1))
{if(cljs.core.logic.lcons_QMARK_(u__$1))
{var temp__3971__auto__ = cljs.core.logic._unify(s__$1,cljs.core.logic._lfirst(u__$1),cljs.core.first(v__$1));
if(cljs.core.truth_(temp__3971__auto__))
{var s__$2 = temp__3971__auto__;
{
var G__3266 = cljs.core.logic._lnext(u__$1);
var G__3267 = cljs.core.next(v__$1);
var G__3268 = s__$2;
u__$1 = G__3266;
v__$1 = G__3267;
s__$1 = G__3268;
continue;
}
} else
{return false;
}
} else
{return cljs.core.logic._unify(s__$1,u__$1,v__$1);
}
} else
{if(cljs.core.logic.lvar_QMARK_(u__$1))
{return cljs.core.logic._unify(s__$1,u__$1,cljs.core.List.EMPTY);
} else
{return false;
}
}
break;
}
} else
{return false;
}
}));
(cljs.core.logic.IUnifyWithLSeq["null"] = true);
(cljs.core.logic._unify_with_lseq["null"] = (function (v,u,s){
return false;
}));
(cljs.core.logic.IUnifyWithSequential["_"] = true);
(cljs.core.logic._unify_with_seq["_"] = (function (v,u,s){
if(cljs.core.sequential_QMARK_(v))
{var u__$1 = u;
var v__$1 = v;
var s__$1 = s;
while(true){
if(cljs.core.seq(u__$1))
{if(cljs.core.seq(v__$1))
{var temp__3971__auto__ = cljs.core.logic._unify(s__$1,cljs.core.first(u__$1),cljs.core.first(v__$1));
if(cljs.core.truth_(temp__3971__auto__))
{var s__$2 = temp__3971__auto__;
{
var G__3269 = cljs.core.next(u__$1);
var G__3270 = cljs.core.next(v__$1);
var G__3271 = s__$2;
u__$1 = G__3269;
v__$1 = G__3270;
s__$1 = G__3271;
continue;
}
} else
{return false;
}
} else
{return false;
}
} else
{if(cljs.core.seq(v__$1))
{return false;
} else
{return s__$1;
}
}
break;
}
} else
{return false;
}
}));
(cljs.core.logic.IUnifyWithSequential["null"] = true);
(cljs.core.logic._unify_with_seq["null"] = (function (v,u,s){
return false;
}));
cljs.core.logic.not_found = {};
cljs.core.logic.unify_with_map_STAR_ = (function unify_with_map_STAR_(v,u,s){
if(!((cljs.core.count(v) === cljs.core.count(u))))
{return false;
} else
{var ks = cljs.core.seq(cljs.core.keys(u));
var s__$1 = s;
while(true){
if(ks)
{var kf = cljs.core.first(ks);
var vf = cljs.core._lookup.cljs$lang$arity$3(v,kf,cljs.core.logic.not_found);
if((vf === cljs.core.logic.not_found))
{return false;
} else
{var temp__3971__auto__ = cljs.core.logic._unify(s__$1,cljs.core._lookup.cljs$lang$arity$3(u,kf,null),vf);
if(cljs.core.truth_(temp__3971__auto__))
{var s__$2 = temp__3971__auto__;
{
var G__3272 = cljs.core.next(ks);
var G__3273 = s__$2;
ks = G__3272;
s__$1 = G__3273;
continue;
}
} else
{return false;
}
}
} else
{return s__$1;
}
break;
}
}
});
cljs.core.PersistentHashMap.prototype.cljs$core$logic$IUnifyWithMap$ = true;
cljs.core.PersistentHashMap.prototype.cljs$core$logic$IUnifyWithMap$_unify_with_map$arity$3 = (function (v,u,s){
return cljs.core.logic.unify_with_map_STAR_(v,u,s);
});
cljs.core.PersistentArrayMap.prototype.cljs$core$logic$IUnifyWithMap$ = true;
cljs.core.PersistentArrayMap.prototype.cljs$core$logic$IUnifyWithMap$_unify_with_map$arity$3 = (function (v,u,s){
return cljs.core.logic.unify_with_map_STAR_(v,u,s);
});
cljs.core.ObjMap.prototype.cljs$core$logic$IUnifyWithMap$ = true;
cljs.core.ObjMap.prototype.cljs$core$logic$IUnifyWithMap$_unify_with_map$arity$3 = (function (v,u,s){
return cljs.core.logic.unify_with_map_STAR_(v,u,s);
});
(cljs.core.logic.IUnifyWithMap["_"] = true);
(cljs.core.logic._unify_with_map["_"] = (function (v,u,s){
return false;
}));
(cljs.core.logic.IUnifyWithMap["null"] = true);
(cljs.core.logic._unify_with_map["null"] = (function (v,u,s){
return false;
}));
cljs.core.PersistentHashSet.prototype.cljs$core$logic$IUnifyWithSet$ = true;
cljs.core.PersistentHashSet.prototype.cljs$core$logic$IUnifyWithSet$_unify_with_set$arity$3 = (function (v,u,s){
var u__$1 = u;
var v__$1 = v;
var ulvars = cljs.core.PersistentVector.EMPTY;
var umissing = cljs.core.PersistentVector.EMPTY;
while(true){
if(cljs.core.seq(u__$1))
{if(cljs.core.seq(v__$1))
{var uf = cljs.core.first(u__$1);
if(cljs.core.logic.lvar_QMARK_(uf))
{{
var G__3274 = cljs.core.disj.cljs$lang$arity$2(u__$1,uf);
var G__3275 = v__$1;
var G__3276 = cljs.core.conj.cljs$lang$arity$2(ulvars,uf);
var G__3277 = umissing;
u__$1 = G__3274;
v__$1 = G__3275;
ulvars = G__3276;
umissing = G__3277;
continue;
}
} else
{if(cljs.core.contains_QMARK_(v__$1,uf))
{{
var G__3278 = cljs.core.disj.cljs$lang$arity$2(u__$1,uf);
var G__3279 = cljs.core.disj.cljs$lang$arity$2(v__$1,uf);
var G__3280 = ulvars;
var G__3281 = umissing;
u__$1 = G__3278;
v__$1 = G__3279;
ulvars = G__3280;
umissing = G__3281;
continue;
}
} else
{{
var G__3282 = cljs.core.disj.cljs$lang$arity$2(u__$1,uf);
var G__3283 = v__$1;
var G__3284 = ulvars;
var G__3285 = cljs.core.conj.cljs$lang$arity$2(umissing,uf);
u__$1 = G__3282;
v__$1 = G__3283;
ulvars = G__3284;
umissing = G__3285;
continue;
}
}
}
} else
{return false;
}
} else
{if(cljs.core.seq(v__$1))
{if(cljs.core.seq(ulvars))
{var v__$2 = v__$1;
var vlvars = cljs.core.PersistentVector.EMPTY;
var vmissing = cljs.core.PersistentVector.EMPTY;
while(true){
if(cljs.core.seq(v__$2))
{var vf = cljs.core.first(v__$2);
if(cljs.core.logic.lvar_QMARK_(vf))
{{
var G__3286 = cljs.core.disj.cljs$lang$arity$2(v__$2,vf);
var G__3287 = cljs.core.conj.cljs$lang$arity$2(vlvars,vf);
var G__3288 = vmissing;
v__$2 = G__3286;
vlvars = G__3287;
vmissing = G__3288;
continue;
}
} else
{{
var G__3289 = cljs.core.disj.cljs$lang$arity$2(v__$2,vf);
var G__3290 = vlvars;
var G__3291 = cljs.core.conj.cljs$lang$arity$2(vmissing,vf);
v__$2 = G__3289;
vlvars = G__3290;
vmissing = G__3291;
continue;
}
}
} else
{return cljs.core.logic._unify(s,cljs.core.concat.cljs$lang$arity$2(ulvars,umissing),cljs.core.concat.cljs$lang$arity$2(vmissing,vlvars));
}
break;
}
} else
{return false;
}
} else
{return s;
}
}
break;
}
});
(cljs.core.logic.IUnifyWithSet["_"] = true);
(cljs.core.logic._unify_with_set["_"] = (function (v,u,s){
return false;
}));
(cljs.core.logic.IUnifyWithSet["null"] = true);
(cljs.core.logic._unify_with_set["null"] = (function (v,u,s){
return false;
}));
(cljs.core.logic.IReifyTerm["_"] = true);
(cljs.core.logic._reify_term["_"] = (function (v,s){
if(cljs.core.sequential_QMARK_(v))
{var v__$1 = v;
var s__$1 = s;
while(true){
if(cljs.core.seq(v__$1))
{{
var G__3292 = cljs.core.next(v__$1);
var G__3293 = cljs.core.logic._reify_STAR_(s__$1,cljs.core.first(v__$1));
v__$1 = G__3292;
s__$1 = G__3293;
continue;
}
} else
{return s__$1;
}
break;
}
} else
{return s;
}
}));
(cljs.core.logic.IReifyTerm["null"] = true);
(cljs.core.logic._reify_term["null"] = (function (v,s){
return s;
}));
cljs.core.logic.walk_term_map_STAR_ = (function walk_term_map_STAR_(v,s){
var v__$1 = v;
var r = cljs.core.ObjMap.EMPTY;
while(true){
if(cljs.core.seq(v__$1))
{var vec__3296 = cljs.core.first(v__$1);
var vfk = cljs.core.nth.cljs$lang$arity$3(vec__3296,0,null);
var vfv = cljs.core.nth.cljs$lang$arity$3(vec__3296,1,null);
{
var G__3297 = cljs.core.next(v__$1);
var G__3298 = cljs.core.assoc.cljs$lang$arity$3(r,vfk,cljs.core.logic._walk_STAR_(s,vfv));
v__$1 = G__3297;
r = G__3298;
continue;
}
} else
{return r;
}
break;
}
});
cljs.core.PersistentHashSet.prototype.cljs$core$logic$IWalkTerm$ = true;
cljs.core.PersistentHashSet.prototype.cljs$core$logic$IWalkTerm$_walk_term$arity$2 = (function (v,s){
var v__$1 = v;
var r = cljs.core.ObjMap.EMPTY;
while(true){
if(cljs.core.seq(v__$1))
{{
var G__3299 = cljs.core.next(v__$1);
var G__3300 = cljs.core.conj.cljs$lang$arity$2(r,cljs.core.logic._walk_STAR_(s,cljs.core.first(v__$1)));
v__$1 = G__3299;
r = G__3300;
continue;
}
} else
{return r;
}
break;
}
});
cljs.core.PersistentHashMap.prototype.cljs$core$logic$IWalkTerm$ = true;
cljs.core.PersistentHashMap.prototype.cljs$core$logic$IWalkTerm$_walk_term$arity$2 = (function (v,s){
return cljs.core.logic.walk_term_map_STAR_(v,s);
});
cljs.core.ObjMap.prototype.cljs$core$logic$IWalkTerm$ = true;
cljs.core.ObjMap.prototype.cljs$core$logic$IWalkTerm$_walk_term$arity$2 = (function (v,s){
return cljs.core.logic.walk_term_map_STAR_(v,s);
});
cljs.core.PersistentVector.prototype.cljs$core$logic$IWalkTerm$ = true;
cljs.core.PersistentVector.prototype.cljs$core$logic$IWalkTerm$_walk_term$arity$2 = (function (v,s){
var v__$1 = v;
var r = cljs.core.PersistentVector.EMPTY;
while(true){
if(cljs.core.seq(v__$1))
{{
var G__3301 = cljs.core.next(v__$1);
var G__3302 = cljs.core.conj.cljs$lang$arity$2(r,cljs.core.logic._walk_STAR_(s,cljs.core.first(v__$1)));
v__$1 = G__3301;
r = G__3302;
continue;
}
} else
{return r;
}
break;
}
});
(cljs.core.logic.IWalkTerm["_"] = true);
(cljs.core.logic._walk_term["_"] = (function (v,s){
if(cljs.core.sequential_QMARK_(v))
{return cljs.core.map.cljs$lang$arity$2((function (p1__3294_SHARP_){
return cljs.core.logic._walk_STAR_(s,p1__3294_SHARP_);
}),v);
} else
{return v;
}
}));
(cljs.core.logic.IWalkTerm["null"] = true);
(cljs.core.logic._walk_term["null"] = (function (v,s){
return null;
}));
(cljs.core.logic.IOccursCheckTerm["_"] = true);
(cljs.core.logic._occurs_check_term["_"] = (function (v,x,s){
if(cljs.core.sequential_QMARK_(v))
{var v__$1 = v;
var x__$1 = x;
var s__$1 = s;
while(true){
if(cljs.core.seq(v__$1))
{var or__3824__auto__ = cljs.core.logic._occurs_check(s__$1,x__$1,cljs.core.first(v__$1));
if(cljs.core.truth_(or__3824__auto__))
{return or__3824__auto__;
} else
{{
var G__3303 = cljs.core.next(v__$1);
var G__3304 = x__$1;
var G__3305 = s__$1;
v__$1 = G__3303;
x__$1 = G__3304;
s__$1 = G__3305;
continue;
}
}
} else
{return false;
}
break;
}
} else
{return false;
}
}));
(cljs.core.logic.IOccursCheckTerm["null"] = true);
(cljs.core.logic._occurs_check_term["null"] = (function (v,x,s){
return false;
}));
(cljs.core.logic.ITake["_"] = true);
(cljs.core.logic._take_STAR_["_"] = (function (this$){
return this$;
}));

goog.provide('cljs.core.logic.Choice');

/**
* @constructor
*/
cljs.core.logic.Choice = (function (a,f){
this.a = a;
this.f = f;
})
cljs.core.logic.Choice.cljs$lang$type = true;
cljs.core.logic.Choice.cljs$lang$ctorPrSeq = (function (this__2315__auto__){
return cljs.core.list.cljs$lang$arity$1("cljs.core.logic/Choice");
});
cljs.core.logic.Choice.cljs$lang$ctorPrWriter = (function (this__2315__auto__,writer__2316__auto__){
return cljs.core._write(writer__2316__auto__,"cljs.core.logic/Choice");
});
cljs.core.logic.Choice.prototype.cljs$core$logic$ITake$ = true;
cljs.core.logic.Choice.prototype.cljs$core$logic$ITake$_take_STAR_$arity$1 = (function (this$){
var self__ = this;
return (new cljs.core.LazySeq(null,false,(function (){
return cljs.core.cons(cljs.core.first(self__.a),(new cljs.core.LazySeq(null,false,(function (){
return cljs.core.logic._take_STAR_(self__.f);
}),null)));
}),null));
});
cljs.core.logic.Choice.prototype.cljs$core$logic$IMPlus$ = true;
cljs.core.logic.Choice.prototype.cljs$core$logic$IMPlus$_mplus$arity$2 = (function (this$,fp){
var self__ = this;
return (new cljs.core.logic.Choice(self__.a,(new cljs.core.logic.Inc((function (){
return cljs.core.logic._mplus((fp.cljs$lang$arity$0 ? fp.cljs$lang$arity$0() : fp.call(null)),self__.f);
})))));
});
cljs.core.logic.Choice.prototype.cljs$core$logic$IBind$ = true;
cljs.core.logic.Choice.prototype.cljs$core$logic$IBind$_bind$arity$2 = (function (this$,g){
var self__ = this;
return cljs.core.logic._mplus((g.cljs$lang$arity$1 ? g.cljs$lang$arity$1(self__.a) : g.call(null,self__.a)),(new cljs.core.logic.Inc((function (){
return cljs.core.logic._bind(self__.f,g);
}))));
});
cljs.core.logic.Choice;
cljs.core.logic.choice = (function choice(a,f){
return (new cljs.core.logic.Choice(a,f));
});
(cljs.core.logic.IBind["null"] = true);
(cljs.core.logic._bind["null"] = (function (_,g){
return null;
}));
(cljs.core.logic.IMPlus["null"] = true);
(cljs.core.logic._mplus["null"] = (function (_,b){
return b;
}));
(cljs.core.logic.ITake["null"] = true);
(cljs.core.logic._take_STAR_["null"] = (function (_){
return cljs.core.List.EMPTY;
}));
(cljs.core.logic.IMPlus["_"] = true);
(cljs.core.logic._mplus["_"] = (function (this$,f){
return (new cljs.core.logic.Choice(this$,f));
}));

goog.provide('cljs.core.logic.Inc');

/**
* @constructor
*/
cljs.core.logic.Inc = (function (f){
this.f = f;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 1;
})
cljs.core.logic.Inc.cljs$lang$type = true;
cljs.core.logic.Inc.cljs$lang$ctorPrSeq = (function (this__2315__auto__){
return cljs.core.list.cljs$lang$arity$1("cljs.core.logic/Inc");
});
cljs.core.logic.Inc.cljs$lang$ctorPrWriter = (function (this__2315__auto__,writer__2316__auto__){
return cljs.core._write(writer__2316__auto__,"cljs.core.logic/Inc");
});
cljs.core.logic.Inc.prototype.cljs$core$logic$ITake$ = true;
cljs.core.logic.Inc.prototype.cljs$core$logic$ITake$_take_STAR_$arity$1 = (function (this$){
var self__ = this;
return (new cljs.core.LazySeq(null,false,(function (){
return cljs.core.logic._take_STAR_((self__.f.cljs$lang$arity$0 ? self__.f.cljs$lang$arity$0() : self__.f.call(null)));
}),null));
});
cljs.core.logic.Inc.prototype.cljs$core$logic$IMPlus$ = true;
cljs.core.logic.Inc.prototype.cljs$core$logic$IMPlus$_mplus$arity$2 = (function (this$,fp){
var self__ = this;
return (new cljs.core.logic.Inc((function (){
return cljs.core.logic._mplus((fp.cljs$lang$arity$0 ? fp.cljs$lang$arity$0() : fp.call(null)),this$);
})));
});
cljs.core.logic.Inc.prototype.cljs$core$logic$IBind$ = true;
cljs.core.logic.Inc.prototype.cljs$core$logic$IBind$_bind$arity$2 = (function (this$,g){
var self__ = this;
return (new cljs.core.logic.Inc((function (){
return cljs.core.logic._bind((self__.f.cljs$lang$arity$0 ? self__.f.cljs$lang$arity$0() : self__.f.call(null)),g);
})));
});
cljs.core.logic.Inc.prototype.call = (function (this_sym3308){
var self__ = this;
var this_sym3308__$1 = this;
var _ = this_sym3308__$1;
return (self__.f.cljs$lang$arity$0 ? self__.f.cljs$lang$arity$0() : self__.f.call(null));
});
cljs.core.logic.Inc.prototype.apply = (function (this_sym3306,args3307){
var self__ = this;
return this_sym3306.call.apply(this_sym3306,[this_sym3306].concat(args3307.slice()));
});
cljs.core.logic.Inc;
/**
* A goal that always succeeds.
*/
cljs.core.logic.succeed = (function succeed(a){
return a;
});
/**
* A goal that always fails.
*/
cljs.core.logic.fail = (function fail(a){
return null;
});
cljs.core.logic.s_SHARP_ = cljs.core.logic.succeed;
cljs.core.logic.u_SHARP_ = cljs.core.logic.fail;
cljs.core.logic.IIfA = {};
cljs.core.logic._ifa = (function _ifa(b,gs,c){
if((function (){var and__3822__auto__ = b;
if(and__3822__auto__)
{return b.cljs$core$logic$IIfA$_ifa$arity$3;
} else
{return and__3822__auto__;
}
})())
{return b.cljs$core$logic$IIfA$_ifa$arity$3(b,gs,c);
} else
{var x__2373__auto__ = (((b == null))?null:b);
return (function (){var or__3824__auto__ = (cljs.core.logic._ifa[goog.typeOf(x__2373__auto__)]);
if(or__3824__auto__)
{return or__3824__auto__;
} else
{var or__3824__auto____$1 = (cljs.core.logic._ifa["_"]);
if(or__3824__auto____$1)
{return or__3824__auto____$1;
} else
{throw cljs.core.missing_protocol("IIfA.-ifa",b);
}
}
})().call(null,b,gs,c);
}
});
cljs.core.logic.IIfU = {};
cljs.core.logic._ifu = (function _ifu(b,gs,c){
if((function (){var and__3822__auto__ = b;
if(and__3822__auto__)
{return b.cljs$core$logic$IIfU$_ifu$arity$3;
} else
{return and__3822__auto__;
}
})())
{return b.cljs$core$logic$IIfU$_ifu$arity$3(b,gs,c);
} else
{var x__2373__auto__ = (((b == null))?null:b);
return (function (){var or__3824__auto__ = (cljs.core.logic._ifu[goog.typeOf(x__2373__auto__)]);
if(or__3824__auto__)
{return or__3824__auto__;
} else
{var or__3824__auto____$1 = (cljs.core.logic._ifu["_"]);
if(or__3824__auto____$1)
{return or__3824__auto____$1;
} else
{throw cljs.core.missing_protocol("IIfU.-ifu",b);
}
}
})().call(null,b,gs,c);
}
});
(cljs.core.logic.IIfA["null"] = true);
(cljs.core.logic._ifa["null"] = (function (b,gs,c){
if(cljs.core.truth_(c))
{return cljs.core.force(c);
} else
{return null;
}
}));
(cljs.core.logic.IIfU["null"] = true);
(cljs.core.logic._ifu["null"] = (function (b,gs,c){
if(cljs.core.truth_(c))
{return cljs.core.force(c);
} else
{return null;
}
}));
cljs.core.logic.Substitutions.prototype.cljs$core$logic$IIfA$ = true;
cljs.core.logic.Substitutions.prototype.cljs$core$logic$IIfA$_ifa$arity$3 = (function (b,gs,c){
var b__$1 = b;
var G__3310 = gs;
var vec__3311 = G__3310;
var g0 = cljs.core.nth.cljs$lang$arity$3(vec__3311,0,null);
var gr = cljs.core.nthnext(vec__3311,1);
var b__$2 = b__$1;
var G__3310__$1 = G__3310;
while(true){
var b__$3 = b__$2;
var vec__3312 = G__3310__$1;
var g0__$1 = cljs.core.nth.cljs$lang$arity$3(vec__3312,0,null);
var gr__$1 = cljs.core.nthnext(vec__3312,1);
if(cljs.core.truth_(g0__$1))
{var temp__3974__auto__ = (g0__$1.cljs$lang$arity$1 ? g0__$1.cljs$lang$arity$1(b__$3) : g0__$1.call(null,b__$3));
if(cljs.core.truth_(temp__3974__auto__))
{var b__$4 = temp__3974__auto__;
{
var G__3313 = b__$4;
var G__3314 = gr__$1;
b__$2 = G__3313;
G__3310__$1 = G__3314;
continue;
}
} else
{return null;
}
} else
{return b__$3;
}
break;
}
});
cljs.core.logic.Substitutions.prototype.cljs$core$logic$IIfU$ = true;
cljs.core.logic.Substitutions.prototype.cljs$core$logic$IIfU$_ifu$arity$3 = (function (b,gs,c){
var b__$1 = b;
var G__3316 = gs;
var vec__3317 = G__3316;
var g0 = cljs.core.nth.cljs$lang$arity$3(vec__3317,0,null);
var gr = cljs.core.nthnext(vec__3317,1);
var b__$2 = b__$1;
var G__3316__$1 = G__3316;
while(true){
var b__$3 = b__$2;
var vec__3318 = G__3316__$1;
var g0__$1 = cljs.core.nth.cljs$lang$arity$3(vec__3318,0,null);
var gr__$1 = cljs.core.nthnext(vec__3318,1);
if(cljs.core.truth_(g0__$1))
{var temp__3974__auto__ = (g0__$1.cljs$lang$arity$1 ? g0__$1.cljs$lang$arity$1(b__$3) : g0__$1.call(null,b__$3));
if(cljs.core.truth_(temp__3974__auto__))
{var b__$4 = temp__3974__auto__;
{
var G__3319 = b__$4;
var G__3320 = gr__$1;
b__$2 = G__3319;
G__3316__$1 = G__3320;
continue;
}
} else
{return null;
}
} else
{return b__$3;
}
break;
}
});
cljs.core.logic.Inc.prototype.cljs$core$logic$IIfU$ = true;
cljs.core.logic.Inc.prototype.cljs$core$logic$IIfU$_ifu$arity$3 = (function (b,gs,c){
return (new cljs.core.logic.Inc((function (){
return cljs.core.logic._ifu((b.cljs$lang$arity$0 ? b.cljs$lang$arity$0() : b.call(null)),gs,c);
})));
});
cljs.core.logic.Inc.prototype.cljs$core$logic$IIfA$ = true;
cljs.core.logic.Inc.prototype.cljs$core$logic$IIfA$_ifa$arity$3 = (function (b,gs,c){
return (new cljs.core.logic.Inc((function (){
return cljs.core.logic._ifa((b.cljs$lang$arity$0 ? b.cljs$lang$arity$0() : b.call(null)),gs,c);
})));
});
cljs.core.logic.Choice.prototype.cljs$core$logic$IIfA$ = true;
cljs.core.logic.Choice.prototype.cljs$core$logic$IIfA$_ifa$arity$3 = (function (b,gs,c){
return cljs.core.reduce.cljs$lang$arity$3(cljs.core.logic._bind,b,gs);
});
cljs.core.logic.Choice.prototype.cljs$core$logic$IIfU$ = true;
cljs.core.logic.Choice.prototype.cljs$core$logic$IIfU$_ifu$arity$3 = (function (b,gs,c){
return cljs.core.reduce.cljs$lang$arity$3(cljs.core.logic._bind,b.a,gs);
});
/**
* A relation where a is nil
*/
cljs.core.logic.nilo = (function nilo(a){
return (function (a__2885__auto__){
var temp__3971__auto__ = cljs.core.logic._unify(a__2885__auto__,null,a);
if(cljs.core.truth_(temp__3971__auto__))
{var b__2886__auto__ = temp__3971__auto__;
return b__2886__auto__;
} else
{return null;
}
});
});
/**
* A relation where a is the empty list
*/
cljs.core.logic.emptyo = (function emptyo(a){
return (function (a__2885__auto__){
var temp__3971__auto__ = cljs.core.logic._unify(a__2885__auto__,cljs.core.List.EMPTY,a);
if(cljs.core.truth_(temp__3971__auto__))
{var b__2886__auto__ = temp__3971__auto__;
return b__2886__auto__;
} else
{return null;
}
});
});
/**
* A relation where l is a collection, such that a is the first of l
* and d is the rest of l
*/
cljs.core.logic.conso = (function conso(a,d,l){
return (function (a__2885__auto__){
var temp__3971__auto__ = cljs.core.logic._unify(a__2885__auto__,cljs.core.logic.lcons(a,d),l);
if(cljs.core.truth_(temp__3971__auto__))
{var b__2886__auto__ = temp__3971__auto__;
return b__2886__auto__;
} else
{return null;
}
});
});
/**
* A relation where l is a collection, such that a is the first of l
*/
cljs.core.logic.firsto = (function firsto(l,a){
return (function (a__2897__auto__){
return (new cljs.core.logic.Inc((function (){
var d = cljs.core.logic.lvar.cljs$lang$arity$1("\uFDD1'd");
return cljs.core.logic._bind(a__2897__auto__,cljs.core.logic.conso(a,d,l));
})));
});
});
/**
* A relation where l is a collection, such that d is the rest of l
*/
cljs.core.logic.resto = (function resto(l,d){
return (function (a__2897__auto__){
return (new cljs.core.logic.Inc((function (){
var a = cljs.core.logic.lvar.cljs$lang$arity$1("\uFDD1'a");
return cljs.core.logic._bind(a__2897__auto__,(function (a__2885__auto__){
var temp__3971__auto__ = cljs.core.logic._unify(a__2885__auto__,cljs.core.logic.lcons(a,d),l);
if(cljs.core.truth_(temp__3971__auto__))
{var b__2886__auto__ = temp__3971__auto__;
return b__2886__auto__;
} else
{return null;
}
}));
})));
});
});
/**
* A relation where l is a collection, such that l contains x
*/
cljs.core.logic.membero = (function membero(x,l){
return (function (a3322){
return (new cljs.core.logic.Inc((function (){
return cljs.core.logic._mplus(cljs.core.logic._bind(a3322,(function (a__2897__auto__){
return (new cljs.core.logic.Inc((function (){
var tail = cljs.core.logic.lvar.cljs$lang$arity$1("\uFDD1'tail");
return cljs.core.logic._bind(a__2897__auto__,(function (a__2885__auto__){
var temp__3971__auto__ = cljs.core.logic._unify(a__2885__auto__,cljs.core.logic.lcons(x,tail),l);
if(cljs.core.truth_(temp__3971__auto__))
{var b__2886__auto__ = temp__3971__auto__;
return b__2886__auto__;
} else
{return null;
}
}));
})));
})),(new cljs.core.logic.Inc((function (){
return cljs.core.logic._bind(a3322,(function (a__2897__auto__){
return (new cljs.core.logic.Inc((function (){
var head = cljs.core.logic.lvar.cljs$lang$arity$1("\uFDD1'head");
var tail = cljs.core.logic.lvar.cljs$lang$arity$1("\uFDD1'tail");
return cljs.core.logic._bind(cljs.core.logic._bind(a__2897__auto__,(function (a__2885__auto__){
var temp__3971__auto__ = cljs.core.logic._unify(a__2885__auto__,cljs.core.logic.lcons(head,tail),l);
if(cljs.core.truth_(temp__3971__auto__))
{var b__2886__auto__ = temp__3971__auto__;
return b__2886__auto__;
} else
{return null;
}
})),membero(x,tail));
})));
}));
}))));
})));
});
});
/**
* A relation where x, y, and z are proper collections,
* such that z is x appended to y
*/
cljs.core.logic.appendo = (function appendo(x,y,z){
return (function (a3324){
return (new cljs.core.logic.Inc((function (){
return cljs.core.logic._mplus(cljs.core.logic._bind(a3324,(function (a__2897__auto__){
return (new cljs.core.logic.Inc((function (){
return cljs.core.logic._bind(cljs.core.logic._bind(a__2897__auto__,(function (a__2885__auto__){
var temp__3971__auto__ = cljs.core.logic._unify(a__2885__auto__,cljs.core.List.EMPTY,x);
if(cljs.core.truth_(temp__3971__auto__))
{var b__2886__auto__ = temp__3971__auto__;
return b__2886__auto__;
} else
{return null;
}
})),(function (a__2897__auto____$1){
return (new cljs.core.logic.Inc((function (){
return cljs.core.logic._bind(a__2897__auto____$1,(function (a__2885__auto__){
var temp__3971__auto__ = cljs.core.logic._unify(a__2885__auto__,y,z);
if(cljs.core.truth_(temp__3971__auto__))
{var b__2886__auto__ = temp__3971__auto__;
return b__2886__auto__;
} else
{return null;
}
}));
})));
}));
})));
})),(new cljs.core.logic.Inc((function (){
return cljs.core.logic._bind(a3324,(function (a__2897__auto__){
return (new cljs.core.logic.Inc((function (){
var a = cljs.core.logic.lvar.cljs$lang$arity$1("\uFDD1'a");
var d = cljs.core.logic.lvar.cljs$lang$arity$1("\uFDD1'd");
return cljs.core.logic._bind(cljs.core.logic._bind(a__2897__auto__,(function (a__2885__auto__){
var temp__3971__auto__ = cljs.core.logic._unify(a__2885__auto__,cljs.core.logic.lcons(a,d),x);
if(cljs.core.truth_(temp__3971__auto__))
{var b__2886__auto__ = temp__3971__auto__;
return b__2886__auto__;
} else
{return null;
}
})),(function (a__2897__auto____$1){
return (new cljs.core.logic.Inc((function (){
var r = cljs.core.logic.lvar.cljs$lang$arity$1("\uFDD1'r");
return cljs.core.logic._bind(cljs.core.logic._bind(a__2897__auto____$1,(function (a__2885__auto__){
var temp__3971__auto__ = cljs.core.logic._unify(a__2885__auto__,cljs.core.logic.lcons(a,r),z);
if(cljs.core.truth_(temp__3971__auto__))
{var b__2886__auto__ = temp__3971__auto__;
return b__2886__auto__;
} else
{return null;
}
})),appendo(d,y,r));
})));
}));
})));
}));
}))));
})));
});
});
cljs.core.logic.prefix = (function prefix(s,_LT_s){
if(cljs.core._EQ_.cljs$lang$arity$2(s,_LT_s))
{return cljs.core.List.EMPTY;
} else
{return cljs.core.conj.cljs$lang$arity$2(prefix(cljs.core.rest(s),_LT_s),cljs.core.first(s));
}
});
cljs.core.logic.IUnifyWithPMap = {};
cljs.core.logic.unify_with_pmap = (function unify_with_pmap(pmap,u,s){
if((function (){var and__3822__auto__ = pmap;
if(and__3822__auto__)
{return pmap.cljs$core$logic$IUnifyWithPMap$unify_with_pmap$arity$3;
} else
{return and__3822__auto__;
}
})())
{return pmap.cljs$core$logic$IUnifyWithPMap$unify_with_pmap$arity$3(pmap,u,s);
} else
{var x__2373__auto__ = (((pmap == null))?null:pmap);
return (function (){var or__3824__auto__ = (cljs.core.logic.unify_with_pmap[goog.typeOf(x__2373__auto__)]);
if(or__3824__auto__)
{return or__3824__auto__;
} else
{var or__3824__auto____$1 = (cljs.core.logic.unify_with_pmap["_"]);
if(or__3824__auto____$1)
{return or__3824__auto____$1;
} else
{throw cljs.core.missing_protocol("IUnifyWithPMap.unify-with-pmap",pmap);
}
}
})().call(null,pmap,u,s);
}
});

goog.provide('cljs.core.logic.PMap');

/**
* @constructor
* @param {*} __meta
* @param {*} __extmap
* @param {*=} __meta 
* @param {*=} __extmap
*/
cljs.core.logic.PMap = (function (__meta,__extmap){
this.__meta = __meta;
this.__extmap = __extmap;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 2229667594;
if(arguments.length>0){
this.__meta = __meta;
this.__extmap = __extmap;
} else {
this.__meta=null;
this.__extmap=null;
}
})
cljs.core.logic.PMap.prototype.cljs$core$logic$IUnifyWithPMap$ = true;
cljs.core.logic.PMap.prototype.cljs$core$logic$IUnifyWithPMap$unify_with_pmap$arity$3 = (function (v,u,s){
var self__ = this;
return v.cljs$core$logic$IUnifyWithMap$_unify_with_map$arity$3(v,u,s);
});
cljs.core.logic.PMap.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__2326__auto__){
var self__ = this;
var h__2196__auto__ = self__.__hash;
if(!((h__2196__auto__ == null)))
{return h__2196__auto__;
} else
{var h__2196__auto____$1 = cljs.core.hash_imap(this__2326__auto__);
self__.__hash = h__2196__auto____$1;
return h__2196__auto____$1;
}
});
cljs.core.logic.PMap.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__2331__auto__,k__2332__auto__){
var self__ = this;
return this__2331__auto__.cljs$core$ILookup$_lookup$arity$3(this__2331__auto__,k__2332__auto__,null);
});
cljs.core.logic.PMap.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__2333__auto__,k3326,else__2334__auto__){
var self__ = this;
if("\uFDD0'else")
{return cljs.core._lookup.cljs$lang$arity$3(self__.__extmap,k3326,else__2334__auto__);
} else
{return null;
}
});
cljs.core.logic.PMap.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__2338__auto__,k__2339__auto__,G__3325){
var self__ = this;
var pred__3328 = cljs.core.identical_QMARK_;
var expr__3329 = k__2339__auto__;
return (new cljs.core.logic.PMap(self__.__meta,cljs.core.assoc.cljs$lang$arity$3(self__.__extmap,k__2339__auto__,G__3325),null));
});
cljs.core.logic.PMap.prototype.cljs$core$logic$IUnifyWithLVar$ = true;
cljs.core.logic.PMap.prototype.cljs$core$logic$IUnifyWithLVar$_unify_with_lvar$arity$3 = (function (v,u,s){
var self__ = this;
return cljs.core.logic._ext_no_check(s,u,v);
});
cljs.core.logic.PMap.prototype.cljs$core$logic$IUnifyTerms$ = true;
cljs.core.logic.PMap.prototype.cljs$core$logic$IUnifyTerms$_unify_terms$arity$3 = (function (u,v,s){
var self__ = this;
return cljs.core.logic.unify_with_pmap(v,u,s);
});
cljs.core.logic.PMap.prototype.cljs$core$logic$IUnifyWithMap$ = true;
cljs.core.logic.PMap.prototype.cljs$core$logic$IUnifyWithMap$_unify_with_map$arity$3 = (function (v,u,s){
var self__ = this;
var ks = cljs.core.keys(v);
var s__$1 = s;
while(true){
if(cljs.core.seq(ks))
{var kf = cljs.core.first(ks);
var uf = cljs.core._lookup.cljs$lang$arity$3(u,kf,"\uFDD0'cljs.core.logic/not-found");
if(cljs.core._EQ_.cljs$lang$arity$2(uf,"\uFDD0'cljs.core.logic/not-found"))
{return null;
} else
{var temp__3971__auto__ = cljs.core.logic._unify(s__$1,v.cljs$core$ILookup$_lookup$arity$3(v,kf,null),uf);
if(cljs.core.truth_(temp__3971__auto__))
{var s__$2 = temp__3971__auto__;
{
var G__3331 = cljs.core.next(ks);
var G__3332 = s__$2;
ks = G__3331;
s__$1 = G__3332;
continue;
}
} else
{return null;
}
}
} else
{return s__$1;
}
break;
}
});
cljs.core.logic.PMap.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__2345__auto__,writer__2346__auto__,opts__2347__auto__){
var self__ = this;
var pr_pair__2348__auto__ = (function (keyval__2349__auto__){
return cljs.core.pr_sequential_writer(writer__2346__auto__,cljs.core.pr_writer,""," ","",opts__2347__auto__,keyval__2349__auto__);
});
return cljs.core.pr_sequential_writer(writer__2346__auto__,pr_pair__2348__auto__,[cljs.core.str("#"),cljs.core.str("PMap"),cljs.core.str("{")].join(''),", ","}",opts__2347__auto__,cljs.core.concat.cljs$lang$arity$2(cljs.core.PersistentVector.EMPTY,self__.__extmap));
});
cljs.core.logic.PMap.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__2336__auto__,entry__2337__auto__){
var self__ = this;
if(cljs.core.vector_QMARK_(entry__2337__auto__))
{return this__2336__auto__.cljs$core$IAssociative$_assoc$arity$3(this__2336__auto__,cljs.core._nth.cljs$lang$arity$2(entry__2337__auto__,0),cljs.core._nth.cljs$lang$arity$2(entry__2337__auto__,1));
} else
{return cljs.core.reduce.cljs$lang$arity$3(cljs.core._conj,this__2336__auto__,entry__2337__auto__);
}
});
cljs.core.logic.PMap.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__2343__auto__){
var self__ = this;
return cljs.core.seq(cljs.core.concat.cljs$lang$arity$2(cljs.core.PersistentVector.EMPTY,self__.__extmap));
});
cljs.core.logic.PMap.prototype.cljs$core$logic$IWalkTerm$ = true;
cljs.core.logic.PMap.prototype.cljs$core$logic$IWalkTerm$_walk_term$arity$2 = (function (v,s){
var self__ = this;
return cljs.core.logic.walk_term_map_STAR_(v,s);
});
cljs.core.logic.PMap.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__2335__auto__){
var self__ = this;
return (0 + cljs.core.count(self__.__extmap));
});
cljs.core.logic.PMap.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this__2327__auto__,other__2328__auto__){
var self__ = this;
if(cljs.core.truth_((function (){var and__3822__auto__ = other__2328__auto__;
if(cljs.core.truth_(and__3822__auto__))
{var and__3822__auto____$1 = (this__2327__auto__.constructor === other__2328__auto__.constructor);
if(and__3822__auto____$1)
{return cljs.core.equiv_map(this__2327__auto__,other__2328__auto__);
} else
{return and__3822__auto____$1;
}
} else
{return and__3822__auto__;
}
})()))
{return true;
} else
{return false;
}
});
cljs.core.logic.PMap.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__2330__auto__,G__3325){
var self__ = this;
return (new cljs.core.logic.PMap(G__3325,self__.__extmap,self__.__hash));
});
cljs.core.logic.PMap.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__2329__auto__){
var self__ = this;
return self__.__meta;
});
cljs.core.logic.PMap.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__2340__auto__,k__2341__auto__){
var self__ = this;
if(cljs.core.contains_QMARK_(cljs.core.PersistentHashSet.EMPTY,k__2341__auto__))
{return cljs.core.dissoc.cljs$lang$arity$2(cljs.core.with_meta(cljs.core.into(cljs.core.ObjMap.EMPTY,this__2340__auto__),self__.__meta),k__2341__auto__);
} else
{return (new cljs.core.logic.PMap(self__.__meta,cljs.core.not_empty(cljs.core.dissoc.cljs$lang$arity$2(self__.__extmap,k__2341__auto__)),null));
}
});
cljs.core.logic.PMap.cljs$lang$type = true;
cljs.core.logic.PMap.cljs$lang$ctorPrSeq = (function (this__2366__auto__){
return cljs.core.list.cljs$lang$arity$1("cljs.core.logic/PMap");
});
cljs.core.logic.PMap.cljs$lang$ctorPrWriter = (function (this__2366__auto__,writer__2367__auto__){
return cljs.core._write(writer__2367__auto__,"cljs.core.logic/PMap");
});
cljs.core.logic.__GT_PMap = (function __GT_PMap(){
return (new cljs.core.logic.PMap());
});
cljs.core.logic.map__GT_PMap = (function map__GT_PMap(G__3327){
return (new cljs.core.logic.PMap(null,cljs.core.dissoc.cljs$lang$arity$1(G__3327)));
});
cljs.core.logic.PMap;
cljs.core.PersistentHashMap.prototype.cljs$core$logic$IUnifyWithPMap$ = true;
cljs.core.PersistentHashMap.prototype.cljs$core$logic$IUnifyWithPMap$unify_with_pmap$arity$3 = (function (v,u,s){
return cljs.core.logic._unify_with_map(u,v,s);
});
cljs.core.PersistentArrayMap.prototype.cljs$core$logic$IUnifyWithPMap$ = true;
cljs.core.PersistentArrayMap.prototype.cljs$core$logic$IUnifyWithPMap$unify_with_pmap$arity$3 = (function (v,u,s){
return cljs.core.logic._unify_with_map(u,v,s);
});
cljs.core.ObjMap.prototype.cljs$core$logic$IUnifyWithPMap$ = true;
cljs.core.ObjMap.prototype.cljs$core$logic$IUnifyWithPMap$unify_with_pmap$arity$3 = (function (v,u,s){
return cljs.core.logic._unify_with_map(u,v,s);
});
cljs.core.logic.LVar.prototype.cljs$core$logic$IUnifyWithPMap$ = true;
cljs.core.logic.LVar.prototype.cljs$core$logic$IUnifyWithPMap$unify_with_pmap$arity$3 = (function (v,u,s){
return cljs.core.logic._ext(s,v,u);
});
Object.prototype.cljs$core$logic$IUnifyWithPMap$ = true;
Object.prototype.cljs$core$logic$IUnifyWithPMap$unify_with_pmap$arity$3 = (function (v,u,s){
return null;
});
(cljs.core.logic.IUnifyWithPMap["null"] = true);
(cljs.core.logic.unify_with_pmap["null"] = (function (v,u,s){
return null;
}));
/**
* Given map m, returns partial map that unifies with maps even if it doesn't share all of the keys of that map.
* Only the keys of the partial map will be unified:
* 
* (m/run* [q]
* (m/fresh [pm x]
* (m/== pm (partial-map {:a x}))
* (m/== pm {:a 1 :b 2})
* (m/== pm q)))
* ;;=> ({:a 1})
*/
cljs.core.logic.partial_map = (function partial_map(m){
return cljs.core.logic.map__GT_PMap(m);
});
cljs.core.logic.lvarq_sym_QMARK_ = (function lvarq_sym_QMARK_(s){
var and__3822__auto__ = cljs.core.symbol_QMARK_(s);
if(and__3822__auto__)
{return cljs.core._EQ_.cljs$lang$arity$2(cljs.core.first([cljs.core.str(s)].join('')),"?");
} else
{return and__3822__auto__;
}
});
cljs.core.logic.proc_lvar = (function proc_lvar(lvar_expr,store){
var v = (function (){var temp__3971__auto__ = cljs.core.deref(store).call(null,lvar_expr);
if(cljs.core.truth_(temp__3971__auto__))
{var u = temp__3971__auto__;
return u;
} else
{return cljs.core.logic.lvar.cljs$lang$arity$1(lvar_expr);
}
})();
cljs.core.swap_BANG_.cljs$lang$arity$3(store,cljs.core.conj,cljs.core.PersistentVector.fromArray([lvar_expr,v], true));
return v;
});
cljs.core.logic.lcons_expr_QMARK_ = (function lcons_expr_QMARK_(expr){
var and__3822__auto__ = cljs.core.seq_QMARK_(expr);
if(and__3822__auto__)
{return cljs.core.some(cljs.core.set(["\uFDD1'."]),cljs.core.set(expr));
} else
{return and__3822__auto__;
}
});
cljs.core.logic.replace_lvar = (function replace_lvar(store){
return (function (expr){
if(cljs.core.truth_(cljs.core.logic.lvarq_sym_QMARK_(expr)))
{return cljs.core.logic.proc_lvar(expr,store);
} else
{if(cljs.core.truth_(cljs.core.logic.lcons_expr_QMARK_(expr)))
{return (cljs.core.logic.prep_STAR_.cljs$lang$arity$2 ? cljs.core.logic.prep_STAR_.cljs$lang$arity$2(expr,store) : cljs.core.logic.prep_STAR_.call(null,expr,store));
} else
{return expr;
}
}
});
});
cljs.core.logic.prep_STAR_ = (function() {
var prep_STAR_ = null;
var prep_STAR___2 = (function (expr,store){
return prep_STAR_.cljs$lang$arity$4(expr,store,false,false);
});
var prep_STAR___3 = (function (expr,store,lcons_QMARK_){
return prep_STAR_.cljs$lang$arity$4(expr,store,lcons_QMARK_,false);
});
var prep_STAR___4 = (function (expr,store,lcons_QMARK_,last_QMARK_){
var expr__$1 = (cljs.core.truth_((function (){var and__3822__auto__ = last_QMARK_;
if(cljs.core.truth_(and__3822__auto__))
{return cljs.core.seq(expr);
} else
{return and__3822__auto__;
}
})())?cljs.core.first(expr):expr);
if(cljs.core.truth_(cljs.core.logic.lvarq_sym_QMARK_(expr__$1)))
{return cljs.core.logic.proc_lvar(expr__$1,store);
} else
{if(cljs.core.seq_QMARK_(expr__$1))
{if(cljs.core.truth_((function (){var or__3824__auto__ = lcons_QMARK_;
if(cljs.core.truth_(or__3824__auto__))
{return or__3824__auto__;
} else
{return cljs.core.logic.lcons_expr_QMARK_(expr__$1);
}
})()))
{var vec__3334 = expr__$1;
var f = cljs.core.nth.cljs$lang$arity$3(vec__3334,0,null);
var n = cljs.core.nthnext(vec__3334,1);
var skip = cljs.core._EQ_.cljs$lang$arity$2(f,"\uFDD1'.");
var tail = prep_STAR_.cljs$lang$arity$4(n,store,lcons_QMARK_,skip);
if(skip)
{return tail;
} else
{return cljs.core.logic.lcons(prep_STAR_.cljs$lang$arity$2(f,store),tail);
}
} else
{return clojure.walk.postwalk(cljs.core.logic.replace_lvar(store),expr__$1);
}
} else
{if("\uFDD0'else")
{return expr__$1;
} else
{return null;
}
}
}
});
prep_STAR_ = function(expr,store,lcons_QMARK_,last_QMARK_){
switch(arguments.length){
case 2:
return prep_STAR___2.call(this,expr,store);
case 3:
return prep_STAR___3.call(this,expr,store,lcons_QMARK_);
case 4:
return prep_STAR___4.call(this,expr,store,lcons_QMARK_,last_QMARK_);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
prep_STAR_.cljs$lang$arity$2 = prep_STAR___2;
prep_STAR_.cljs$lang$arity$3 = prep_STAR___3;
prep_STAR_.cljs$lang$arity$4 = prep_STAR___4;
return prep_STAR_;
})()
;
/**
* Prep a quoted expression. All symbols preceded by ? will
* be replaced with logic vars.
*/
cljs.core.logic.prep = (function prep(expr){
var lvars = cljs.core.atom.cljs$lang$arity$1(cljs.core.ObjMap.EMPTY);
var prepped = (cljs.core.truth_(cljs.core.logic.lcons_expr_QMARK_(expr))?cljs.core.logic.prep_STAR_.cljs$lang$arity$3(expr,lvars,true):clojure.walk.postwalk(cljs.core.logic.replace_lvar(lvars),expr));
return cljs.core.with_meta(prepped,cljs.core.ObjMap.fromObject(["\uFDD0'lvars"],{"\uFDD0'lvars":cljs.core.deref(lvars)}));
});
cljs.core.logic.unify = (function unify(s,u,v){
if((u === v))
{return s;
} else
{var u__$1 = cljs.core.logic._walk(s,u);
var v__$1 = cljs.core.logic._walk(s,v);
if((u__$1 === v__$1))
{return s;
} else
{return cljs.core.logic._unify_terms(u__$1,v__$1,s);
}
}
});
/**
* Unify the terms u and w.
* @param {...*} var_args
*/
cljs.core.logic.unifier_STAR_ = (function() {
var unifier_STAR_ = null;
var unifier_STAR___2 = (function (u,w){
return cljs.core.first(cljs.core.doall.cljs$lang$arity$1((function (){var xs__2905__auto__ = cljs.core.logic._take_STAR_((new cljs.core.logic.Inc((function (){
return (function (a__2897__auto__){
return (new cljs.core.logic.Inc((function (){
var q = cljs.core.logic.lvar.cljs$lang$arity$1("\uFDD1'q");
return cljs.core.logic._bind(cljs.core.logic._bind(cljs.core.logic._bind(a__2897__auto__,(function (a__2885__auto__){
var temp__3971__auto__ = cljs.core.logic._unify(a__2885__auto__,u,w);
if(cljs.core.truth_(temp__3971__auto__))
{var b__2886__auto__ = temp__3971__auto__;
return b__2886__auto__;
} else
{return null;
}
})),(function (a__2885__auto__){
var temp__3971__auto__ = cljs.core.logic._unify(a__2885__auto__,u,q);
if(cljs.core.truth_(temp__3971__auto__))
{var b__2886__auto__ = temp__3971__auto__;
return b__2886__auto__;
} else
{return null;
}
})),(function (a__2906__auto__){
return cljs.core.cons(cljs.core.logic._reify(a__2906__auto__,q),cljs.core.List.EMPTY);
}));
})));
}).call(null,cljs.core.logic.empty_s);
}))));
if(false)
{return cljs.core.take(false,xs__2905__auto__);
} else
{return xs__2905__auto__;
}
})()));
});
var unifier_STAR___3 = (function() { 
var G__3335__delegate = function (u,w,ts){
return cljs.core.apply.cljs$lang$arity$3(unifier_STAR_,unifier_STAR_.cljs$lang$arity$2(u,w),ts);
};
var G__3335 = function (u,w,var_args){
var ts = null;
if (goog.isDef(var_args)) {
  ts = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__3335__delegate.call(this, u, w, ts);
};
G__3335.cljs$lang$maxFixedArity = 2;
G__3335.cljs$lang$applyTo = (function (arglist__3336){
var u = cljs.core.first(arglist__3336);
var w = cljs.core.first(cljs.core.next(arglist__3336));
var ts = cljs.core.rest(cljs.core.next(arglist__3336));
return G__3335__delegate(u, w, ts);
});
G__3335.cljs$lang$arity$variadic = G__3335__delegate;
return G__3335;
})()
;
unifier_STAR_ = function(u,w,var_args){
var ts = var_args;
switch(arguments.length){
case 2:
return unifier_STAR___2.call(this,u,w);
default:
return unifier_STAR___3.cljs$lang$arity$variadic(u,w, cljs.core.array_seq(arguments, 2));
}
throw(new Error('Invalid arity: ' + arguments.length));
};
unifier_STAR_.cljs$lang$maxFixedArity = 2;
unifier_STAR_.cljs$lang$applyTo = unifier_STAR___3.cljs$lang$applyTo;
unifier_STAR_.cljs$lang$arity$2 = unifier_STAR___2;
unifier_STAR_.cljs$lang$arity$variadic = unifier_STAR___3.cljs$lang$arity$variadic;
return unifier_STAR_;
})()
;
/**
* Return the binding map that unifies terms u and w.
* u and w should prepped terms.
* @param {...*} var_args
*/
cljs.core.logic.binding_map_STAR_ = (function() {
var binding_map_STAR_ = null;
var binding_map_STAR___2 = (function (u,w){
var lvars = cljs.core.merge.cljs$lang$arity$variadic(cljs.core.array_seq([(new cljs.core.Keyword("\uFDD0'lvars")).call(null,cljs.core.meta(u)),(new cljs.core.Keyword("\uFDD0'lvars")).call(null,cljs.core.meta(w))], 0));
var s = cljs.core.logic.unify(cljs.core.logic.empty_s,u,w);
if(cljs.core.truth_(s))
{return cljs.core.into(cljs.core.ObjMap.EMPTY,cljs.core.map.cljs$lang$arity$2((function (p__3339){
var vec__3340 = p__3339;
var k = cljs.core.nth.cljs$lang$arity$3(vec__3340,0,null);
var v = cljs.core.nth.cljs$lang$arity$3(vec__3340,1,null);
return cljs.core.PersistentVector.fromArray([k,cljs.core.logic._reify(s,v)], true);
}),lvars));
} else
{return null;
}
});
var binding_map_STAR___3 = (function() { 
var G__3341__delegate = function (u,w,ts){
return cljs.core.apply.cljs$lang$arity$3(binding_map_STAR_,binding_map_STAR_.cljs$lang$arity$2(u,w),ts);
};
var G__3341 = function (u,w,var_args){
var ts = null;
if (goog.isDef(var_args)) {
  ts = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__3341__delegate.call(this, u, w, ts);
};
G__3341.cljs$lang$maxFixedArity = 2;
G__3341.cljs$lang$applyTo = (function (arglist__3342){
var u = cljs.core.first(arglist__3342);
var w = cljs.core.first(cljs.core.next(arglist__3342));
var ts = cljs.core.rest(cljs.core.next(arglist__3342));
return G__3341__delegate(u, w, ts);
});
G__3341.cljs$lang$arity$variadic = G__3341__delegate;
return G__3341;
})()
;
binding_map_STAR_ = function(u,w,var_args){
var ts = var_args;
switch(arguments.length){
case 2:
return binding_map_STAR___2.call(this,u,w);
default:
return binding_map_STAR___3.cljs$lang$arity$variadic(u,w, cljs.core.array_seq(arguments, 2));
}
throw(new Error('Invalid arity: ' + arguments.length));
};
binding_map_STAR_.cljs$lang$maxFixedArity = 2;
binding_map_STAR_.cljs$lang$applyTo = binding_map_STAR___3.cljs$lang$applyTo;
binding_map_STAR_.cljs$lang$arity$2 = binding_map_STAR___2;
binding_map_STAR_.cljs$lang$arity$variadic = binding_map_STAR___3.cljs$lang$arity$variadic;
return binding_map_STAR_;
})()
;
/**
* Unify the terms u and w. Will prep the terms.
* @param {...*} var_args
*/
cljs.core.logic.unifier = (function() {
var unifier = null;
var unifier__2 = (function (u,w){
if(!(cljs.core.logic.lcons_QMARK_(u)))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.cljs$lang$arity$variadic(cljs.core.array_seq([cljs.core.with_meta(cljs.core.list("\uFDD1'not",cljs.core.with_meta(cljs.core.list("\uFDD1'lcons?","\uFDD1'u"),cljs.core.hash_map("\uFDD0'line",980))),cljs.core.hash_map("\uFDD0'line",980))], 0)))].join('')));
}
if(!(cljs.core.logic.lcons_QMARK_(w)))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.cljs$lang$arity$variadic(cljs.core.array_seq([cljs.core.with_meta(cljs.core.list("\uFDD1'not",cljs.core.with_meta(cljs.core.list("\uFDD1'lcons?","\uFDD1'w"),cljs.core.hash_map("\uFDD0'line",981))),cljs.core.hash_map("\uFDD0'line",981))], 0)))].join('')));
}
var up = cljs.core.logic.prep(u);
var wp = cljs.core.logic.prep(w);
return cljs.core.logic.unifier_STAR_.cljs$lang$arity$2(up,wp);
});
var unifier__3 = (function() { 
var G__3343__delegate = function (u,w,ts){
return cljs.core.apply.cljs$lang$arity$3(unifier,unifier.cljs$lang$arity$2(u,w),ts);
};
var G__3343 = function (u,w,var_args){
var ts = null;
if (goog.isDef(var_args)) {
  ts = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__3343__delegate.call(this, u, w, ts);
};
G__3343.cljs$lang$maxFixedArity = 2;
G__3343.cljs$lang$applyTo = (function (arglist__3344){
var u = cljs.core.first(arglist__3344);
var w = cljs.core.first(cljs.core.next(arglist__3344));
var ts = cljs.core.rest(cljs.core.next(arglist__3344));
return G__3343__delegate(u, w, ts);
});
G__3343.cljs$lang$arity$variadic = G__3343__delegate;
return G__3343;
})()
;
unifier = function(u,w,var_args){
var ts = var_args;
switch(arguments.length){
case 2:
return unifier__2.call(this,u,w);
default:
return unifier__3.cljs$lang$arity$variadic(u,w, cljs.core.array_seq(arguments, 2));
}
throw(new Error('Invalid arity: ' + arguments.length));
};
unifier.cljs$lang$maxFixedArity = 2;
unifier.cljs$lang$applyTo = unifier__3.cljs$lang$applyTo;
unifier.cljs$lang$arity$2 = unifier__2;
unifier.cljs$lang$arity$variadic = unifier__3.cljs$lang$arity$variadic;
return unifier;
})()
;
/**
* Return the binding map that unifies terms u and w.
* Will prep the terms.
* @param {...*} var_args
*/
cljs.core.logic.binding_map = (function() {
var binding_map = null;
var binding_map__2 = (function (u,w){
if(!(cljs.core.logic.lcons_QMARK_(u)))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.cljs$lang$arity$variadic(cljs.core.array_seq([cljs.core.with_meta(cljs.core.list("\uFDD1'not",cljs.core.with_meta(cljs.core.list("\uFDD1'lcons?","\uFDD1'u"),cljs.core.hash_map("\uFDD0'line",992))),cljs.core.hash_map("\uFDD0'line",992))], 0)))].join('')));
}
if(!(cljs.core.logic.lcons_QMARK_(w)))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.cljs$lang$arity$variadic(cljs.core.array_seq([cljs.core.with_meta(cljs.core.list("\uFDD1'not",cljs.core.with_meta(cljs.core.list("\uFDD1'lcons?","\uFDD1'w"),cljs.core.hash_map("\uFDD0'line",993))),cljs.core.hash_map("\uFDD0'line",993))], 0)))].join('')));
}
var up = cljs.core.logic.prep(u);
var wp = cljs.core.logic.prep(w);
return cljs.core.logic.binding_map_STAR_.cljs$lang$arity$2(up,wp);
});
var binding_map__3 = (function() { 
var G__3345__delegate = function (u,w,ts){
return cljs.core.apply.cljs$lang$arity$3(binding_map,binding_map.cljs$lang$arity$2(u,w),ts);
};
var G__3345 = function (u,w,var_args){
var ts = null;
if (goog.isDef(var_args)) {
  ts = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__3345__delegate.call(this, u, w, ts);
};
G__3345.cljs$lang$maxFixedArity = 2;
G__3345.cljs$lang$applyTo = (function (arglist__3346){
var u = cljs.core.first(arglist__3346);
var w = cljs.core.first(cljs.core.next(arglist__3346));
var ts = cljs.core.rest(cljs.core.next(arglist__3346));
return G__3345__delegate(u, w, ts);
});
G__3345.cljs$lang$arity$variadic = G__3345__delegate;
return G__3345;
})()
;
binding_map = function(u,w,var_args){
var ts = var_args;
switch(arguments.length){
case 2:
return binding_map__2.call(this,u,w);
default:
return binding_map__3.cljs$lang$arity$variadic(u,w, cljs.core.array_seq(arguments, 2));
}
throw(new Error('Invalid arity: ' + arguments.length));
};
binding_map.cljs$lang$maxFixedArity = 2;
binding_map.cljs$lang$applyTo = binding_map__3.cljs$lang$applyTo;
binding_map.cljs$lang$arity$2 = binding_map__2;
binding_map.cljs$lang$arity$variadic = binding_map__3.cljs$lang$arity$variadic;
return binding_map;
})()
;
