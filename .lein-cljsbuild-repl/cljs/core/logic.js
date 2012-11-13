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
{var x__2565__auto__ = (((u == null))?null:u);
return (function (){var or__3824__auto__ = (cljs.core.logic._unify_terms[goog.typeOf(x__2565__auto__)]);
if(or__3824__auto__)
{return or__3824__auto__;
} else
{var or__3824__auto____$1 = (cljs.core.logic._unify_terms["_"]);
if(or__3824__auto____$1)
{return or__3824__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"IUnifyTerms.-unify-terms",u);
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
{var x__2565__auto__ = (((v == null))?null:v);
return (function (){var or__3824__auto__ = (cljs.core.logic._unify_with_nil[goog.typeOf(x__2565__auto__)]);
if(or__3824__auto__)
{return or__3824__auto__;
} else
{var or__3824__auto____$1 = (cljs.core.logic._unify_with_nil["_"]);
if(or__3824__auto____$1)
{return or__3824__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"IUnifyWithNil.-unify-with-nil",v);
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
{var x__2565__auto__ = (((v == null))?null:v);
return (function (){var or__3824__auto__ = (cljs.core.logic._unify_with_object[goog.typeOf(x__2565__auto__)]);
if(or__3824__auto__)
{return or__3824__auto__;
} else
{var or__3824__auto____$1 = (cljs.core.logic._unify_with_object["_"]);
if(or__3824__auto____$1)
{return or__3824__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"IUnifyWithObject.-unify-with-object",v);
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
{var x__2565__auto__ = (((v == null))?null:v);
return (function (){var or__3824__auto__ = (cljs.core.logic._unify_with_lvar[goog.typeOf(x__2565__auto__)]);
if(or__3824__auto__)
{return or__3824__auto__;
} else
{var or__3824__auto____$1 = (cljs.core.logic._unify_with_lvar["_"]);
if(or__3824__auto____$1)
{return or__3824__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"IUnifyWithLVar.-unify-with-lvar",v);
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
{var x__2565__auto__ = (((v == null))?null:v);
return (function (){var or__3824__auto__ = (cljs.core.logic._unify_with_lseq[goog.typeOf(x__2565__auto__)]);
if(or__3824__auto__)
{return or__3824__auto__;
} else
{var or__3824__auto____$1 = (cljs.core.logic._unify_with_lseq["_"]);
if(or__3824__auto____$1)
{return or__3824__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"IUnifyWithLSeq.-unify-with-lseq",v);
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
{var x__2565__auto__ = (((v == null))?null:v);
return (function (){var or__3824__auto__ = (cljs.core.logic._unify_with_seq[goog.typeOf(x__2565__auto__)]);
if(or__3824__auto__)
{return or__3824__auto__;
} else
{var or__3824__auto____$1 = (cljs.core.logic._unify_with_seq["_"]);
if(or__3824__auto____$1)
{return or__3824__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"IUnifyWithSequential.-unify-with-seq",v);
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
{var x__2565__auto__ = (((v == null))?null:v);
return (function (){var or__3824__auto__ = (cljs.core.logic._unify_with_map[goog.typeOf(x__2565__auto__)]);
if(or__3824__auto__)
{return or__3824__auto__;
} else
{var or__3824__auto____$1 = (cljs.core.logic._unify_with_map["_"]);
if(or__3824__auto____$1)
{return or__3824__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"IUnifyWithMap.-unify-with-map",v);
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
{var x__2565__auto__ = (((v == null))?null:v);
return (function (){var or__3824__auto__ = (cljs.core.logic._unify_with_set[goog.typeOf(x__2565__auto__)]);
if(or__3824__auto__)
{return or__3824__auto__;
} else
{var or__3824__auto____$1 = (cljs.core.logic._unify_with_set["_"]);
if(or__3824__auto____$1)
{return or__3824__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"IUnifyWithSet.-unify-with-set",v);
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
{var x__2565__auto__ = (((v == null))?null:v);
return (function (){var or__3824__auto__ = (cljs.core.logic._reify_term[goog.typeOf(x__2565__auto__)]);
if(or__3824__auto__)
{return or__3824__auto__;
} else
{var or__3824__auto____$1 = (cljs.core.logic._reify_term["_"]);
if(or__3824__auto____$1)
{return or__3824__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"IReifyTerm.-reify-term",v);
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
{var x__2565__auto__ = (((v == null))?null:v);
return (function (){var or__3824__auto__ = (cljs.core.logic._walk_term[goog.typeOf(x__2565__auto__)]);
if(or__3824__auto__)
{return or__3824__auto__;
} else
{var or__3824__auto____$1 = (cljs.core.logic._walk_term["_"]);
if(or__3824__auto____$1)
{return or__3824__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"IWalkTerm.-walk-term",v);
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
{var x__2565__auto__ = (((v == null))?null:v);
return (function (){var or__3824__auto__ = (cljs.core.logic._occurs_check_term[goog.typeOf(x__2565__auto__)]);
if(or__3824__auto__)
{return or__3824__auto__;
} else
{var or__3824__auto____$1 = (cljs.core.logic._occurs_check_term["_"]);
if(or__3824__auto____$1)
{return or__3824__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"IOccursCheckTerm.-occurs-check-term",v);
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
{var x__2565__auto__ = (((u == null))?null:u);
return (function (){var or__3824__auto__ = (cljs.core.logic._build_term[goog.typeOf(x__2565__auto__)]);
if(or__3824__auto__)
{return or__3824__auto__;
} else
{var or__3824__auto____$1 = (cljs.core.logic._build_term["_"]);
if(or__3824__auto____$1)
{return or__3824__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"IBuildTerm.-build-term",u);
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
{var x__2565__auto__ = (((this$ == null))?null:this$);
return (function (){var or__3824__auto__ = (cljs.core.logic._bind[goog.typeOf(x__2565__auto__)]);
if(or__3824__auto__)
{return or__3824__auto__;
} else
{var or__3824__auto____$1 = (cljs.core.logic._bind["_"]);
if(or__3824__auto____$1)
{return or__3824__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"IBind.-bind",this$);
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
{var x__2565__auto__ = (((a == null))?null:a);
return (function (){var or__3824__auto__ = (cljs.core.logic._mplus[goog.typeOf(x__2565__auto__)]);
if(or__3824__auto__)
{return or__3824__auto__;
} else
{var or__3824__auto____$1 = (cljs.core.logic._mplus["_"]);
if(or__3824__auto____$1)
{return or__3824__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"IMPlus.-mplus",a);
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
{var x__2565__auto__ = (((a == null))?null:a);
return (function (){var or__3824__auto__ = (cljs.core.logic._take_STAR_[goog.typeOf(x__2565__auto__)]);
if(or__3824__auto__)
{return or__3824__auto__;
} else
{var or__3824__auto____$1 = (cljs.core.logic._take_STAR_["_"]);
if(or__3824__auto____$1)
{return or__3824__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"ITake.-take*",a);
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
{var x__2565__auto__ = (((this$ == null))?null:this$);
return (function (){var or__3824__auto__ = (cljs.core.logic._lhs[goog.typeOf(x__2565__auto__)]);
if(or__3824__auto__)
{return or__3824__auto__;
} else
{var or__3824__auto____$1 = (cljs.core.logic._lhs["_"]);
if(or__3824__auto____$1)
{return or__3824__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"IPair.-lhs",this$);
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
{var x__2565__auto__ = (((this$ == null))?null:this$);
return (function (){var or__3824__auto__ = (cljs.core.logic._rhs[goog.typeOf(x__2565__auto__)]);
if(or__3824__auto__)
{return or__3824__auto__;
} else
{var or__3824__auto____$1 = (cljs.core.logic._rhs["_"]);
if(or__3824__auto____$1)
{return or__3824__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"IPair.-rhs",this$);
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
cljs.core.logic.Pair.cljs$lang$ctorPrSeq = (function (this__2507__auto__){
return cljs.core.list.call(null,"cljs.core.logic/Pair");
});
cljs.core.logic.Pair.cljs$lang$ctorPrWriter = (function (this__2507__auto__,writer__2508__auto__){
return cljs.core._write.call(null,writer__2508__auto__,"cljs.core.logic/Pair");
});
cljs.core.logic.Pair.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (coll,writer,opts){
var self__ = this;
return cljs.core._write.call(null,writer,[cljs.core.str("("),cljs.core.str(self__.lhs),cljs.core.str(" . "),cljs.core.str(self__.rhs),cljs.core.str(")")].join(''));
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
var pred__3443 = cljs.core._EQ_;
var expr__3444 = i;
if(pred__3443.call(null,0,expr__3444))
{return self__.lhs;
} else
{if(pred__3443.call(null,1,expr__3444))
{return self__.rhs;
} else
{throw (new Error("Index out of bounds"));
}
}
});
cljs.core.logic.Pair.prototype.cljs$core$IIndexed$_nth$arity$3 = (function (_,i,not_found){
var self__ = this;
var pred__3446 = cljs.core._EQ_;
var expr__3447 = i;
if(pred__3446.call(null,0,expr__3447))
{return self__.lhs;
} else
{if(pred__3446.call(null,1,expr__3447))
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
var and__3822__auto__ = cljs.core._EQ_.call(null,self__.lhs,other.lhs);
if(and__3822__auto__)
{return cljs.core._EQ_.call(null,self__.rhs,other.rhs);
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
{var x__2565__auto__ = (((this$ == null))?null:this$);
return (function (){var or__3824__auto__ = (cljs.core.logic._occurs_check[goog.typeOf(x__2565__auto__)]);
if(or__3824__auto__)
{return or__3824__auto__;
} else
{var or__3824__auto____$1 = (cljs.core.logic._occurs_check["_"]);
if(or__3824__auto____$1)
{return or__3824__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"ISubstitutions.-occurs-check",this$);
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
{var x__2565__auto__ = (((this$ == null))?null:this$);
return (function (){var or__3824__auto__ = (cljs.core.logic._ext[goog.typeOf(x__2565__auto__)]);
if(or__3824__auto__)
{return or__3824__auto__;
} else
{var or__3824__auto____$1 = (cljs.core.logic._ext["_"]);
if(or__3824__auto____$1)
{return or__3824__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"ISubstitutions.-ext",this$);
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
{var x__2565__auto__ = (((this$ == null))?null:this$);
return (function (){var or__3824__auto__ = (cljs.core.logic._ext_no_check[goog.typeOf(x__2565__auto__)]);
if(or__3824__auto__)
{return or__3824__auto__;
} else
{var or__3824__auto____$1 = (cljs.core.logic._ext_no_check["_"]);
if(or__3824__auto____$1)
{return or__3824__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"ISubstitutions.-ext-no-check",this$);
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
{var x__2565__auto__ = (((this$ == null))?null:this$);
return (function (){var or__3824__auto__ = (cljs.core.logic._walk[goog.typeOf(x__2565__auto__)]);
if(or__3824__auto__)
{return or__3824__auto__;
} else
{var or__3824__auto____$1 = (cljs.core.logic._walk["_"]);
if(or__3824__auto____$1)
{return or__3824__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"ISubstitutions.-walk",this$);
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
{var x__2565__auto__ = (((this$ == null))?null:this$);
return (function (){var or__3824__auto__ = (cljs.core.logic._walk_STAR_[goog.typeOf(x__2565__auto__)]);
if(or__3824__auto__)
{return or__3824__auto__;
} else
{var or__3824__auto____$1 = (cljs.core.logic._walk_STAR_["_"]);
if(or__3824__auto____$1)
{return or__3824__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"ISubstitutions.-walk*",this$);
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
{var x__2565__auto__ = (((this$ == null))?null:this$);
return (function (){var or__3824__auto__ = (cljs.core.logic._unify[goog.typeOf(x__2565__auto__)]);
if(or__3824__auto__)
{return or__3824__auto__;
} else
{var or__3824__auto____$1 = (cljs.core.logic._unify["_"]);
if(or__3824__auto____$1)
{return or__3824__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"ISubstitutions.-unify",this$);
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
{var x__2565__auto__ = (((_ == null))?null:_);
return (function (){var or__3824__auto__ = (cljs.core.logic._reify_lvar_name[goog.typeOf(x__2565__auto__)]);
if(or__3824__auto__)
{return or__3824__auto__;
} else
{var or__3824__auto____$1 = (cljs.core.logic._reify_lvar_name["_"]);
if(or__3824__auto____$1)
{return or__3824__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"ISubstitutions.-reify-lvar-name",_);
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
{var x__2565__auto__ = (((this$ == null))?null:this$);
return (function (){var or__3824__auto__ = (cljs.core.logic._reify_STAR_[goog.typeOf(x__2565__auto__)]);
if(or__3824__auto__)
{return or__3824__auto__;
} else
{var or__3824__auto____$1 = (cljs.core.logic._reify_STAR_["_"]);
if(or__3824__auto____$1)
{return or__3824__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"ISubstitutions.-reify*",this$);
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
{var x__2565__auto__ = (((this$ == null))?null:this$);
return (function (){var or__3824__auto__ = (cljs.core.logic._reify[goog.typeOf(x__2565__auto__)]);
if(or__3824__auto__)
{return or__3824__auto__;
} else
{var or__3824__auto____$1 = (cljs.core.logic._reify["_"]);
if(or__3824__auto____$1)
{return or__3824__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"ISubstitutions.-reify",this$);
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
var xs__$1 = cljs.core._seq.call(null,xs);
while(true){
if((xs__$1 == null))
{return cljs.core.logic.not_found;
} else
{var xs__$2 = xs__$1;
var x = cljs.core._first.call(null,xs__$2);
var lhs = x.lhs;
if((k === lhs))
{return x.rhs;
} else
{{
var G__3449 = cljs.core._next.call(null,xs__$2);
xs__$1 = G__3449;
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
cljs.core.logic.Substitutions.cljs$lang$ctorPrSeq = (function (this__2507__auto__){
return cljs.core.list.call(null,"cljs.core.logic/Substitutions");
});
cljs.core.logic.Substitutions.cljs$lang$ctorPrWriter = (function (this__2507__auto__,writer__2508__auto__){
return cljs.core._write.call(null,writer__2508__auto__,"cljs.core.logic/Substitutions");
});
cljs.core.logic.Substitutions.prototype.cljs$core$logic$ITake$ = true;
cljs.core.logic.Substitutions.prototype.cljs$core$logic$ITake$_take_STAR_$arity$1 = (function (this$){
var self__ = this;
return this$;
});
cljs.core.logic.Substitutions.prototype.cljs$core$logic$IMPlus$ = true;
cljs.core.logic.Substitutions.prototype.cljs$core$logic$IMPlus$_mplus$arity$2 = (function (this$,f){
var self__ = this;
return cljs.core.logic.choice.call(null,this$,f);
});
cljs.core.logic.Substitutions.prototype.cljs$core$logic$IBind$ = true;
cljs.core.logic.Substitutions.prototype.cljs$core$logic$IBind$_bind$arity$2 = (function (this$,g){
var self__ = this;
return g.call(null,this$);
});
cljs.core.logic.Substitutions.prototype.cljs$core$logic$ISubstitutions$ = true;
cljs.core.logic.Substitutions.prototype.cljs$core$logic$ISubstitutions$_walk$arity$2 = (function (this$,v){
var self__ = this;
if(cljs.core.truth_(cljs.core.logic.lvar_QMARK_.call(null,v)))
{var rhs = cljs.core.logic.assq.call(null,v,self__.s);
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
return cljs.core.logic._reify_term.call(null,v__$1,this$);
});
cljs.core.logic.Substitutions.prototype.cljs$core$logic$ISubstitutions$_walk_STAR_$arity$2 = (function (this$,v){
var self__ = this;
var v__$1 = this$.cljs$core$logic$ISubstitutions$_walk$arity$2(this$,v);
return cljs.core.logic._walk_term.call(null,v__$1,this$);
});
cljs.core.logic.Substitutions.prototype.cljs$core$logic$ISubstitutions$_reify_lvar_name$arity$1 = (function (this$){
var self__ = this;
return cljs.core.symbol.call(null,[cljs.core.str("_."),cljs.core.str(cljs.core.count.call(null,self__.s))].join(''));
});
cljs.core.logic.Substitutions.prototype.cljs$core$logic$ISubstitutions$_reify$arity$2 = (function (this$,v){
var self__ = this;
var v__$1 = this$.cljs$core$logic$ISubstitutions$_walk_STAR_$arity$2(this$,v);
return cljs.core.logic._walk_STAR_.call(null,cljs.core.logic._reify_STAR_.call(null,cljs.core.logic.empty_s,v__$1),v__$1);
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
{return cljs.core.logic._unify_terms.call(null,u__$1,v__$1,this$);
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
return (new cljs.core.logic.Substitutions(cljs.core.conj.call(null,self__.s,(new cljs.core.logic.Pair(u,v)))));
});
cljs.core.logic.Substitutions.prototype.cljs$core$logic$ISubstitutions$_occurs_check$arity$3 = (function (this$,u,v){
var self__ = this;
var v__$1 = this$.cljs$core$logic$ISubstitutions$_walk$arity$2(this$,v);
return cljs.core.logic._occurs_check_term.call(null,v__$1,u,this$);
});
cljs.core.logic.Substitutions.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this$,writer,opts){
var self__ = this;
return cljs.core._pr_writer.call(null,self__.s,writer,opts);
});
cljs.core.logic.Substitutions.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this$,o){
var self__ = this;
var or__3824__auto__ = (this$ === o);
if(or__3824__auto__)
{return or__3824__auto__;
} else
{var and__3822__auto__ = cljs.core.instance_QMARK_.call(null,cljs.core.logic.Substitutions,o);
if(and__3822__auto__)
{return cljs.core._EQ_.call(null,self__.s,o.s);
} else
{return and__3822__auto__;
}
}
});
cljs.core.logic.Substitutions;
cljs.core.logic.make_s = (function make_s(s){
return (new cljs.core.logic.Substitutions(s));
});
cljs.core.logic.empty_s = cljs.core.logic.make_s.call(null,cljs.core.List.EMPTY);
cljs.core.logic.subst_QMARK_ = (function subst_QMARK_(x){
return cljs.core.instance_QMARK_.call(null,cljs.core.logic.Substitutions,x);
});
cljs.core.logic.to_s = (function to_s(v){
var s = cljs.core.reduce.call(null,(function (l,p__3452){
var vec__3453 = p__3452;
var k = cljs.core.nth.call(null,vec__3453,0,null);
var v__$1 = cljs.core.nth.call(null,vec__3453,1,null);
return cljs.core.conj.call(null,l,cljs.core.logic.pair.call(null,k,v__$1));
}),cljs.core.List.EMPTY,v);
return cljs.core.logic.make_s.call(null,s);
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
cljs.core.logic.LVar.cljs$lang$ctorPrSeq = (function (this__2507__auto__){
return cljs.core.list.call(null,"cljs.core.logic/LVar");
});
cljs.core.logic.LVar.cljs$lang$ctorPrWriter = (function (this__2507__auto__,writer__2508__auto__){
return cljs.core._write.call(null,writer__2508__auto__,"cljs.core.logic/LVar");
});
cljs.core.logic.LVar.prototype.cljs$core$IHash$_hash$arity$1 = (function (this$){
var self__ = this;
return cljs.core._hash.call(null,self__.name);
});
cljs.core.logic.LVar.prototype.cljs$core$logic$IUnifyWithLVar$ = true;
cljs.core.logic.LVar.prototype.cljs$core$logic$IUnifyWithLVar$_unify_with_lvar$arity$3 = (function (v,u,s){
var self__ = this;
return cljs.core.logic._ext_no_check.call(null,s,u,v);
});
cljs.core.logic.LVar.prototype.cljs$core$logic$IUnifyWithSequential$ = true;
cljs.core.logic.LVar.prototype.cljs$core$logic$IUnifyWithSequential$_unify_with_seq$arity$3 = (function (v,u,s){
var self__ = this;
return cljs.core.logic._ext.call(null,s,v,u);
});
cljs.core.logic.LVar.prototype.cljs$core$logic$IReifyTerm$ = true;
cljs.core.logic.LVar.prototype.cljs$core$logic$IReifyTerm$_reify_term$arity$2 = (function (v,s){
var self__ = this;
return cljs.core.logic._ext.call(null,s,v,cljs.core.logic._reify_lvar_name.call(null,s));
});
cljs.core.logic.LVar.prototype.cljs$core$logic$IUnifyTerms$ = true;
cljs.core.logic.LVar.prototype.cljs$core$logic$IUnifyTerms$_unify_terms$arity$3 = (function (u,v,s){
var self__ = this;
return cljs.core.logic._unify_with_lvar.call(null,v,u,s);
});
cljs.core.logic.LVar.prototype.cljs$core$logic$IUnifyWithNil$ = true;
cljs.core.logic.LVar.prototype.cljs$core$logic$IUnifyWithNil$_unify_with_nil$arity$3 = (function (v,u,s){
var self__ = this;
return cljs.core.logic._ext_no_check.call(null,s,v,u);
});
cljs.core.logic.LVar.prototype.cljs$core$logic$IUnifyWithMap$ = true;
cljs.core.logic.LVar.prototype.cljs$core$logic$IUnifyWithMap$_unify_with_map$arity$3 = (function (v,u,s){
var self__ = this;
return cljs.core.logic._ext.call(null,s,v,u);
});
cljs.core.logic.LVar.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (_,writer,opts){
var self__ = this;
return cljs.core._write.call(null,writer,[cljs.core.str("<lvar:"),cljs.core.str(self__.name),cljs.core.str(">")].join(''));
});
cljs.core.logic.LVar.prototype.cljs$core$logic$IOccursCheckTerm$ = true;
cljs.core.logic.LVar.prototype.cljs$core$logic$IOccursCheckTerm$_occurs_check_term$arity$3 = (function (v,x,s){
var self__ = this;
return cljs.core._EQ_.call(null,cljs.core.logic._walk.call(null,s,v),x);
});
cljs.core.logic.LVar.prototype.toString = (function (){
var self__ = this;
var this$ = this;
return cljs.core.pr_str.call(null,this$);
});
cljs.core.logic.LVar.prototype.cljs$core$logic$IUnifyWithSet$ = true;
cljs.core.logic.LVar.prototype.cljs$core$logic$IUnifyWithSet$_unify_with_set$arity$3 = (function (v,u,s){
var self__ = this;
return cljs.core.logic._ext.call(null,s,v,u);
});
cljs.core.logic.LVar.prototype.cljs$core$logic$IWalkTerm$ = true;
cljs.core.logic.LVar.prototype.cljs$core$logic$IWalkTerm$_walk_term$arity$2 = (function (v,s){
var self__ = this;
return v;
});
cljs.core.logic.LVar.prototype.cljs$core$logic$IUnifyWithObject$ = true;
cljs.core.logic.LVar.prototype.cljs$core$logic$IUnifyWithObject$_unify_with_object$arity$3 = (function (v,u,s){
var self__ = this;
return cljs.core.logic._ext.call(null,s,v,u);
});
cljs.core.logic.LVar.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this$,o){
var self__ = this;
var and__3822__auto__ = cljs.core.instance_QMARK_.call(null,cljs.core.logic.LVar,o);
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
return cljs.core.logic._ext.call(null,s,v,u);
});
cljs.core.logic.LVar;
cljs.core.logic.lvar_sym_counter = cljs.core.atom.call(null,0);
cljs.core.logic.lvar = (function() {
var lvar = null;
var lvar__0 = (function (){
return lvar.call(null,"\uFDD1'gen");
});
var lvar__1 = (function (name){
var name__$1 = name.substring(2,name.length) + '_' + cljs.core.swap_BANG_.call(null,cljs.core.logic.lvar_sym_counter,cljs.core.inc);
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
return cljs.core.instance_QMARK_.call(null,cljs.core.logic.LVar,x);
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
{var x__2565__auto__ = (((this$ == null))?null:this$);
return (function (){var or__3824__auto__ = (cljs.core.logic._lfirst[goog.typeOf(x__2565__auto__)]);
if(or__3824__auto__)
{return or__3824__auto__;
} else
{var or__3824__auto____$1 = (cljs.core.logic._lfirst["_"]);
if(or__3824__auto____$1)
{return or__3824__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"LConsSeq.-lfirst",this$);
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
{var x__2565__auto__ = (((this$ == null))?null:this$);
return (function (){var or__3824__auto__ = (cljs.core.logic._lnext[goog.typeOf(x__2565__auto__)]);
if(or__3824__auto__)
{return or__3824__auto__;
} else
{var or__3824__auto____$1 = (cljs.core.logic._lnext["_"]);
if(or__3824__auto____$1)
{return or__3824__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"LConsSeq.-lnext",this$);
}
}
})().call(null,this$);
}
});
cljs.core.logic.lcons_pr_seq = (function lcons_pr_seq(x){
if(cljs.core.truth_(cljs.core.logic.lcons_QMARK_.call(null,x)))
{return (new cljs.core.LazySeq(null,false,(function (){
return cljs.core.cons.call(null,cljs.core.logic._lfirst.call(null,x),lcons_pr_seq.call(null,cljs.core.logic._lnext.call(null,x)));
}),null));
} else
{if("\uFDD0'else")
{return cljs.core.list.call(null,"\uFDD1'.",x);
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
cljs.core.logic.LCons.cljs$lang$ctorPrSeq = (function (this__2507__auto__){
return cljs.core.list.call(null,"cljs.core.logic/LCons");
});
cljs.core.logic.LCons.cljs$lang$ctorPrWriter = (function (this__2507__auto__,writer__2508__auto__){
return cljs.core._write.call(null,writer__2508__auto__,"cljs.core.logic/LCons");
});
cljs.core.logic.LCons.prototype.cljs$core$logic$IUnifyWithSequential$ = true;
cljs.core.logic.LCons.prototype.cljs$core$logic$IUnifyWithSequential$_unify_with_seq$arity$3 = (function (v,u,s){
var self__ = this;
return cljs.core.logic._unify_with_lseq.call(null,u,v,s);
});
cljs.core.logic.LCons.prototype.cljs$core$logic$IReifyTerm$ = true;
cljs.core.logic.LCons.prototype.cljs$core$logic$IReifyTerm$_reify_term$arity$2 = (function (v,s){
var self__ = this;
var v__$1 = v;
var s__$1 = s;
while(true){
if(cljs.core.truth_(cljs.core.logic.lcons_QMARK_.call(null,v__$1)))
{{
var G__3454 = v__$1.cljs$core$logic$LConsSeq$_lnext$arity$1(v__$1);
var G__3455 = cljs.core.logic._reify_STAR_.call(null,s__$1,v__$1.cljs$core$logic$LConsSeq$_lfirst$arity$1(v__$1));
v__$1 = G__3454;
s__$1 = G__3455;
continue;
}
} else
{return cljs.core.logic._reify_STAR_.call(null,s__$1,v__$1);
}
break;
}
});
cljs.core.logic.LCons.prototype.cljs$core$logic$IUnifyTerms$ = true;
cljs.core.logic.LCons.prototype.cljs$core$logic$IUnifyTerms$_unify_terms$arity$3 = (function (u,v,s){
var self__ = this;
return cljs.core.logic._unify_with_lseq.call(null,v,u,s);
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
return cljs.core.pr_sequential_writer.call(null,writer,cljs.core.pr_writer,"("," ",")",opts,cljs.core.logic.lcons_pr_seq.call(null,this$));
});
cljs.core.logic.LCons.prototype.cljs$core$logic$IOccursCheckTerm$ = true;
cljs.core.logic.LCons.prototype.cljs$core$logic$IOccursCheckTerm$_occurs_check_term$arity$3 = (function (v,x,s){
var self__ = this;
var v__$1 = v;
var x__$1 = x;
var s__$1 = s;
while(true){
if(cljs.core.truth_(cljs.core.logic.lcons_QMARK_.call(null,v__$1)))
{var or__3824__auto__ = cljs.core.logic._occurs_check.call(null,s__$1,x__$1,v__$1.cljs$core$logic$LConsSeq$_lfirst$arity$1(v__$1));
if(cljs.core.truth_(or__3824__auto__))
{return or__3824__auto__;
} else
{{
var G__3456 = v__$1.cljs$core$logic$LConsSeq$_lnext$arity$1(v__$1);
var G__3457 = x__$1;
var G__3458 = s__$1;
v__$1 = G__3456;
x__$1 = G__3457;
s__$1 = G__3458;
continue;
}
}
} else
{return cljs.core.logic._occurs_check.call(null,s__$1,x__$1,v__$1);
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
return cljs.core.logic.lcons.call(null,cljs.core.logic._walk_STAR_.call(null,s,v.cljs$core$logic$LConsSeq$_lfirst$arity$1(v)),cljs.core.logic._walk_STAR_.call(null,s,v.cljs$core$logic$LConsSeq$_lnext$arity$1(v)));
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
{var and__3822__auto__ = cljs.core.instance_QMARK_.call(null,cljs.core.logic.LCons,o);
if(and__3822__auto__)
{var me = this$;
var you = o;
while(true){
if((me == null))
{return (you == null);
} else
{if(cljs.core.logic.lvar_QMARK_.call(null,me))
{return true;
} else
{if(cljs.core.logic.lvar_QMARK_.call(null,you))
{return true;
} else
{if(cljs.core.truth_((function (){var and__3822__auto____$1 = cljs.core.logic.lcons_QMARK_.call(null,me);
if(cljs.core.truth_(and__3822__auto____$1))
{return cljs.core.logic.lcons_QMARK_.call(null,you);
} else
{return and__3822__auto____$1;
}
})()))
{var mef = me.cljs$core$logic$LConsSeq$_lfirst$arity$1(me);
var youf = cljs.core.logic._lfirst.call(null,you);
var and__3822__auto____$1 = (function (){var or__3824__auto____$1 = cljs.core._EQ_.call(null,mef,youf);
if(or__3824__auto____$1)
{return or__3824__auto____$1;
} else
{var or__3824__auto____$2 = cljs.core.logic.lvar_QMARK_.call(null,mef);
if(or__3824__auto____$2)
{return or__3824__auto____$2;
} else
{return cljs.core.logic.lvar_QMARK_.call(null,youf);
}
}
})();
if(cljs.core.truth_(and__3822__auto____$1))
{{
var G__3459 = me.cljs$core$logic$LConsSeq$_lnext$arity$1(me);
var G__3460 = cljs.core.logic._lnext.call(null,you);
me = G__3459;
you = G__3460;
continue;
}
} else
{return and__3822__auto____$1;
}
} else
{if("\uFDD0'else")
{return cljs.core._EQ_.call(null,me,you);
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
if(cljs.core.logic.lvar_QMARK_.call(null,u__$1))
{return cljs.core.logic._unify.call(null,s__$1,u__$1,v__$1);
} else
{if(cljs.core.logic.lvar_QMARK_.call(null,v__$1))
{return cljs.core.logic._unify.call(null,s__$1,v__$1,u__$1);
} else
{if(cljs.core.truth_((function (){var and__3822__auto__ = cljs.core.logic.lcons_QMARK_.call(null,u__$1);
if(cljs.core.truth_(and__3822__auto__))
{return cljs.core.logic.lcons_QMARK_.call(null,v__$1);
} else
{return and__3822__auto__;
}
})()))
{var temp__3971__auto__ = cljs.core.logic._unify.call(null,s__$1,cljs.core.logic._lfirst.call(null,u__$1),v__$1.cljs$core$logic$LConsSeq$_lfirst$arity$1(v__$1));
if(cljs.core.truth_(temp__3971__auto__))
{var s__$2 = temp__3971__auto__;
{
var G__3461 = cljs.core.logic._lnext.call(null,u__$1);
var G__3462 = v__$1.cljs$core$logic$LConsSeq$_lnext$arity$1(v__$1);
var G__3463 = s__$2;
u__$1 = G__3461;
v__$1 = G__3462;
s__$1 = G__3463;
continue;
}
} else
{return false;
}
} else
{if("\uFDD0'else")
{return cljs.core.logic._unify.call(null,s__$1,u__$1,v__$1);
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
if((function (){var or__3824__auto__ = cljs.core.coll_QMARK_.call(null,d);
if(or__3824__auto__)
{return or__3824__auto__;
} else
{return (d == null);
}
})())
{return cljs.core.cons.call(null,a,cljs.core.seq.call(null,d));
} else
{return (new cljs.core.logic.LCons(a,d,null));
}
});
cljs.core.logic.lcons_QMARK_ = (function lcons_QMARK_(x){
return cljs.core.instance_QMARK_.call(null,cljs.core.logic.LCons,x);
});
cljs.core.PersistentHashSet.prototype.cljs$core$logic$IUnifyTerms$ = true;
cljs.core.PersistentHashSet.prototype.cljs$core$logic$IUnifyTerms$_unify_terms$arity$3 = (function (u,v,s){
return cljs.core.logic._unify_with_set.call(null,v,u,s);
});
cljs.core.PersistentHashMap.prototype.cljs$core$logic$IUnifyTerms$ = true;
cljs.core.PersistentHashMap.prototype.cljs$core$logic$IUnifyTerms$_unify_terms$arity$3 = (function (u,v,s){
return cljs.core.logic._unify_with_map.call(null,v,u,s);
});
cljs.core.PersistentArrayMap.prototype.cljs$core$logic$IUnifyTerms$ = true;
cljs.core.PersistentArrayMap.prototype.cljs$core$logic$IUnifyTerms$_unify_terms$arity$3 = (function (u,v,s){
return cljs.core.logic._unify_with_map.call(null,v,u,s);
});
cljs.core.ObjMap.prototype.cljs$core$logic$IUnifyTerms$ = true;
cljs.core.ObjMap.prototype.cljs$core$logic$IUnifyTerms$_unify_terms$arity$3 = (function (u,v,s){
return cljs.core.logic._unify_with_map.call(null,v,u,s);
});
(cljs.core.logic.IUnifyTerms["_"] = true);
(cljs.core.logic._unify_terms["_"] = (function (u,v,s){
if(cljs.core.sequential_QMARK_.call(null,u))
{return cljs.core.logic._unify_with_seq.call(null,v,u,s);
} else
{return cljs.core.logic._unify_with_object.call(null,v,u,s);
}
}));
(cljs.core.logic.IUnifyTerms["null"] = true);
(cljs.core.logic._unify_terms["null"] = (function (u,v,s){
return cljs.core.logic._unify_with_nil.call(null,v,u,s);
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
if(cljs.core._EQ_.call(null,u,v))
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
return cljs.core.logic._ext.call(null,s,u,v);
}));
(cljs.core.logic.IUnifyWithLVar["null"] = true);
(cljs.core.logic._unify_with_lvar["null"] = (function (v,u,s){
return cljs.core.logic._ext_no_check.call(null,s,u,v);
}));
(cljs.core.logic.IUnifyWithLSeq["_"] = true);
(cljs.core.logic._unify_with_lseq["_"] = (function (v,u,s){
if(cljs.core.sequential_QMARK_.call(null,v))
{var u__$1 = u;
var v__$1 = v;
var s__$1 = s;
while(true){
if(cljs.core.seq.call(null,v__$1))
{if(cljs.core.logic.lcons_QMARK_.call(null,u__$1))
{var temp__3971__auto__ = cljs.core.logic._unify.call(null,s__$1,cljs.core.logic._lfirst.call(null,u__$1),cljs.core.first.call(null,v__$1));
if(cljs.core.truth_(temp__3971__auto__))
{var s__$2 = temp__3971__auto__;
{
var G__3464 = cljs.core.logic._lnext.call(null,u__$1);
var G__3465 = cljs.core.next.call(null,v__$1);
var G__3466 = s__$2;
u__$1 = G__3464;
v__$1 = G__3465;
s__$1 = G__3466;
continue;
}
} else
{return false;
}
} else
{return cljs.core.logic._unify.call(null,s__$1,u__$1,v__$1);
}
} else
{if(cljs.core.logic.lvar_QMARK_.call(null,u__$1))
{return cljs.core.logic._unify.call(null,s__$1,u__$1,cljs.core.List.EMPTY);
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
if(cljs.core.sequential_QMARK_.call(null,v))
{var u__$1 = u;
var v__$1 = v;
var s__$1 = s;
while(true){
if(cljs.core.seq.call(null,u__$1))
{if(cljs.core.seq.call(null,v__$1))
{var temp__3971__auto__ = cljs.core.logic._unify.call(null,s__$1,cljs.core.first.call(null,u__$1),cljs.core.first.call(null,v__$1));
if(cljs.core.truth_(temp__3971__auto__))
{var s__$2 = temp__3971__auto__;
{
var G__3467 = cljs.core.next.call(null,u__$1);
var G__3468 = cljs.core.next.call(null,v__$1);
var G__3469 = s__$2;
u__$1 = G__3467;
v__$1 = G__3468;
s__$1 = G__3469;
continue;
}
} else
{return false;
}
} else
{return false;
}
} else
{if(cljs.core.seq.call(null,v__$1))
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
if(!((cljs.core.count.call(null,v) === cljs.core.count.call(null,u))))
{return false;
} else
{var ks = cljs.core.seq.call(null,cljs.core.keys.call(null,u));
var s__$1 = s;
while(true){
if(ks)
{var kf = cljs.core.first.call(null,ks);
var vf = cljs.core._lookup.call(null,v,kf,cljs.core.logic.not_found);
if((vf === cljs.core.logic.not_found))
{return false;
} else
{var temp__3971__auto__ = cljs.core.logic._unify.call(null,s__$1,cljs.core._lookup.call(null,u,kf,null),vf);
if(cljs.core.truth_(temp__3971__auto__))
{var s__$2 = temp__3971__auto__;
{
var G__3470 = cljs.core.next.call(null,ks);
var G__3471 = s__$2;
ks = G__3470;
s__$1 = G__3471;
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
return cljs.core.logic.unify_with_map_STAR_.call(null,v,u,s);
});
cljs.core.PersistentArrayMap.prototype.cljs$core$logic$IUnifyWithMap$ = true;
cljs.core.PersistentArrayMap.prototype.cljs$core$logic$IUnifyWithMap$_unify_with_map$arity$3 = (function (v,u,s){
return cljs.core.logic.unify_with_map_STAR_.call(null,v,u,s);
});
cljs.core.ObjMap.prototype.cljs$core$logic$IUnifyWithMap$ = true;
cljs.core.ObjMap.prototype.cljs$core$logic$IUnifyWithMap$_unify_with_map$arity$3 = (function (v,u,s){
return cljs.core.logic.unify_with_map_STAR_.call(null,v,u,s);
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
if(cljs.core.seq.call(null,u__$1))
{if(cljs.core.seq.call(null,v__$1))
{var uf = cljs.core.first.call(null,u__$1);
if(cljs.core.logic.lvar_QMARK_.call(null,uf))
{{
var G__3472 = cljs.core.disj.call(null,u__$1,uf);
var G__3473 = v__$1;
var G__3474 = cljs.core.conj.call(null,ulvars,uf);
var G__3475 = umissing;
u__$1 = G__3472;
v__$1 = G__3473;
ulvars = G__3474;
umissing = G__3475;
continue;
}
} else
{if(cljs.core.contains_QMARK_.call(null,v__$1,uf))
{{
var G__3476 = cljs.core.disj.call(null,u__$1,uf);
var G__3477 = cljs.core.disj.call(null,v__$1,uf);
var G__3478 = ulvars;
var G__3479 = umissing;
u__$1 = G__3476;
v__$1 = G__3477;
ulvars = G__3478;
umissing = G__3479;
continue;
}
} else
{{
var G__3480 = cljs.core.disj.call(null,u__$1,uf);
var G__3481 = v__$1;
var G__3482 = ulvars;
var G__3483 = cljs.core.conj.call(null,umissing,uf);
u__$1 = G__3480;
v__$1 = G__3481;
ulvars = G__3482;
umissing = G__3483;
continue;
}
}
}
} else
{return false;
}
} else
{if(cljs.core.seq.call(null,v__$1))
{if(cljs.core.seq.call(null,ulvars))
{var v__$2 = v__$1;
var vlvars = cljs.core.PersistentVector.EMPTY;
var vmissing = cljs.core.PersistentVector.EMPTY;
while(true){
if(cljs.core.seq.call(null,v__$2))
{var vf = cljs.core.first.call(null,v__$2);
if(cljs.core.logic.lvar_QMARK_.call(null,vf))
{{
var G__3484 = cljs.core.disj.call(null,v__$2,vf);
var G__3485 = cljs.core.conj.call(null,vlvars,vf);
var G__3486 = vmissing;
v__$2 = G__3484;
vlvars = G__3485;
vmissing = G__3486;
continue;
}
} else
{{
var G__3487 = cljs.core.disj.call(null,v__$2,vf);
var G__3488 = vlvars;
var G__3489 = cljs.core.conj.call(null,vmissing,vf);
v__$2 = G__3487;
vlvars = G__3488;
vmissing = G__3489;
continue;
}
}
} else
{return cljs.core.logic._unify.call(null,s,cljs.core.concat.call(null,ulvars,umissing),cljs.core.concat.call(null,vmissing,vlvars));
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
if(cljs.core.sequential_QMARK_.call(null,v))
{var v__$1 = v;
var s__$1 = s;
while(true){
if(cljs.core.seq.call(null,v__$1))
{{
var G__3490 = cljs.core.next.call(null,v__$1);
var G__3491 = cljs.core.logic._reify_STAR_.call(null,s__$1,cljs.core.first.call(null,v__$1));
v__$1 = G__3490;
s__$1 = G__3491;
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
if(cljs.core.seq.call(null,v__$1))
{var vec__3494 = cljs.core.first.call(null,v__$1);
var vfk = cljs.core.nth.call(null,vec__3494,0,null);
var vfv = cljs.core.nth.call(null,vec__3494,1,null);
{
var G__3495 = cljs.core.next.call(null,v__$1);
var G__3496 = cljs.core.assoc.call(null,r,vfk,cljs.core.logic._walk_STAR_.call(null,s,vfv));
v__$1 = G__3495;
r = G__3496;
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
if(cljs.core.seq.call(null,v__$1))
{{
var G__3497 = cljs.core.next.call(null,v__$1);
var G__3498 = cljs.core.conj.call(null,r,cljs.core.logic._walk_STAR_.call(null,s,cljs.core.first.call(null,v__$1)));
v__$1 = G__3497;
r = G__3498;
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
return cljs.core.logic.walk_term_map_STAR_.call(null,v,s);
});
cljs.core.ObjMap.prototype.cljs$core$logic$IWalkTerm$ = true;
cljs.core.ObjMap.prototype.cljs$core$logic$IWalkTerm$_walk_term$arity$2 = (function (v,s){
return cljs.core.logic.walk_term_map_STAR_.call(null,v,s);
});
cljs.core.PersistentVector.prototype.cljs$core$logic$IWalkTerm$ = true;
cljs.core.PersistentVector.prototype.cljs$core$logic$IWalkTerm$_walk_term$arity$2 = (function (v,s){
var v__$1 = v;
var r = cljs.core.PersistentVector.EMPTY;
while(true){
if(cljs.core.seq.call(null,v__$1))
{{
var G__3499 = cljs.core.next.call(null,v__$1);
var G__3500 = cljs.core.conj.call(null,r,cljs.core.logic._walk_STAR_.call(null,s,cljs.core.first.call(null,v__$1)));
v__$1 = G__3499;
r = G__3500;
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
if(cljs.core.sequential_QMARK_.call(null,v))
{return cljs.core.map.call(null,(function (p1__3492_SHARP_){
return cljs.core.logic._walk_STAR_.call(null,s,p1__3492_SHARP_);
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
if(cljs.core.sequential_QMARK_.call(null,v))
{var v__$1 = v;
var x__$1 = x;
var s__$1 = s;
while(true){
if(cljs.core.seq.call(null,v__$1))
{var or__3824__auto__ = cljs.core.logic._occurs_check.call(null,s__$1,x__$1,cljs.core.first.call(null,v__$1));
if(cljs.core.truth_(or__3824__auto__))
{return or__3824__auto__;
} else
{{
var G__3501 = cljs.core.next.call(null,v__$1);
var G__3502 = x__$1;
var G__3503 = s__$1;
v__$1 = G__3501;
x__$1 = G__3502;
s__$1 = G__3503;
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
cljs.core.logic.Choice.cljs$lang$ctorPrSeq = (function (this__2507__auto__){
return cljs.core.list.call(null,"cljs.core.logic/Choice");
});
cljs.core.logic.Choice.cljs$lang$ctorPrWriter = (function (this__2507__auto__,writer__2508__auto__){
return cljs.core._write.call(null,writer__2508__auto__,"cljs.core.logic/Choice");
});
cljs.core.logic.Choice.prototype.cljs$core$logic$ITake$ = true;
cljs.core.logic.Choice.prototype.cljs$core$logic$ITake$_take_STAR_$arity$1 = (function (this$){
var self__ = this;
return (new cljs.core.LazySeq(null,false,(function (){
return cljs.core.cons.call(null,cljs.core.first.call(null,self__.a),(new cljs.core.LazySeq(null,false,(function (){
return cljs.core.logic._take_STAR_.call(null,self__.f);
}),null)));
}),null));
});
cljs.core.logic.Choice.prototype.cljs$core$logic$IMPlus$ = true;
cljs.core.logic.Choice.prototype.cljs$core$logic$IMPlus$_mplus$arity$2 = (function (this$,fp){
var self__ = this;
return (new cljs.core.logic.Choice(self__.a,(new cljs.core.logic.Inc((function (){
return cljs.core.logic._mplus.call(null,fp.call(null),self__.f);
})))));
});
cljs.core.logic.Choice.prototype.cljs$core$logic$IBind$ = true;
cljs.core.logic.Choice.prototype.cljs$core$logic$IBind$_bind$arity$2 = (function (this$,g){
var self__ = this;
return cljs.core.logic._mplus.call(null,g.call(null,self__.a),(new cljs.core.logic.Inc((function (){
return cljs.core.logic._bind.call(null,self__.f,g);
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
cljs.core.logic.Inc.cljs$lang$ctorPrSeq = (function (this__2507__auto__){
return cljs.core.list.call(null,"cljs.core.logic/Inc");
});
cljs.core.logic.Inc.cljs$lang$ctorPrWriter = (function (this__2507__auto__,writer__2508__auto__){
return cljs.core._write.call(null,writer__2508__auto__,"cljs.core.logic/Inc");
});
cljs.core.logic.Inc.prototype.cljs$core$logic$ITake$ = true;
cljs.core.logic.Inc.prototype.cljs$core$logic$ITake$_take_STAR_$arity$1 = (function (this$){
var self__ = this;
return (new cljs.core.LazySeq(null,false,(function (){
return cljs.core.logic._take_STAR_.call(null,self__.f.call(null));
}),null));
});
cljs.core.logic.Inc.prototype.cljs$core$logic$IMPlus$ = true;
cljs.core.logic.Inc.prototype.cljs$core$logic$IMPlus$_mplus$arity$2 = (function (this$,fp){
var self__ = this;
return (new cljs.core.logic.Inc((function (){
return cljs.core.logic._mplus.call(null,fp.call(null),this$);
})));
});
cljs.core.logic.Inc.prototype.cljs$core$logic$IBind$ = true;
cljs.core.logic.Inc.prototype.cljs$core$logic$IBind$_bind$arity$2 = (function (this$,g){
var self__ = this;
return (new cljs.core.logic.Inc((function (){
return cljs.core.logic._bind.call(null,self__.f.call(null),g);
})));
});
cljs.core.logic.Inc.prototype.call = (function (this_sym3506){
var self__ = this;
var this_sym3506__$1 = this;
var _ = this_sym3506__$1;
return self__.f.call(null);
});
cljs.core.logic.Inc.prototype.apply = (function (this_sym3504,args3505){
var self__ = this;
return this_sym3504.call.apply(this_sym3504,[this_sym3504].concat(args3505.slice()));
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
{var x__2565__auto__ = (((b == null))?null:b);
return (function (){var or__3824__auto__ = (cljs.core.logic._ifa[goog.typeOf(x__2565__auto__)]);
if(or__3824__auto__)
{return or__3824__auto__;
} else
{var or__3824__auto____$1 = (cljs.core.logic._ifa["_"]);
if(or__3824__auto____$1)
{return or__3824__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"IIfA.-ifa",b);
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
{var x__2565__auto__ = (((b == null))?null:b);
return (function (){var or__3824__auto__ = (cljs.core.logic._ifu[goog.typeOf(x__2565__auto__)]);
if(or__3824__auto__)
{return or__3824__auto__;
} else
{var or__3824__auto____$1 = (cljs.core.logic._ifu["_"]);
if(or__3824__auto____$1)
{return or__3824__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"IIfU.-ifu",b);
}
}
})().call(null,b,gs,c);
}
});
(cljs.core.logic.IIfA["null"] = true);
(cljs.core.logic._ifa["null"] = (function (b,gs,c){
if(cljs.core.truth_(c))
{return cljs.core.force.call(null,c);
} else
{return null;
}
}));
(cljs.core.logic.IIfU["null"] = true);
(cljs.core.logic._ifu["null"] = (function (b,gs,c){
if(cljs.core.truth_(c))
{return cljs.core.force.call(null,c);
} else
{return null;
}
}));
cljs.core.logic.Substitutions.prototype.cljs$core$logic$IIfA$ = true;
cljs.core.logic.Substitutions.prototype.cljs$core$logic$IIfA$_ifa$arity$3 = (function (b,gs,c){
var b__$1 = b;
var G__3508 = gs;
var vec__3509 = G__3508;
var g0 = cljs.core.nth.call(null,vec__3509,0,null);
var gr = cljs.core.nthnext.call(null,vec__3509,1);
var b__$2 = b__$1;
var G__3508__$1 = G__3508;
while(true){
var b__$3 = b__$2;
var vec__3510 = G__3508__$1;
var g0__$1 = cljs.core.nth.call(null,vec__3510,0,null);
var gr__$1 = cljs.core.nthnext.call(null,vec__3510,1);
if(cljs.core.truth_(g0__$1))
{var temp__3974__auto__ = g0__$1.call(null,b__$3);
if(cljs.core.truth_(temp__3974__auto__))
{var b__$4 = temp__3974__auto__;
{
var G__3511 = b__$4;
var G__3512 = gr__$1;
b__$2 = G__3511;
G__3508__$1 = G__3512;
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
var G__3514 = gs;
var vec__3515 = G__3514;
var g0 = cljs.core.nth.call(null,vec__3515,0,null);
var gr = cljs.core.nthnext.call(null,vec__3515,1);
var b__$2 = b__$1;
var G__3514__$1 = G__3514;
while(true){
var b__$3 = b__$2;
var vec__3516 = G__3514__$1;
var g0__$1 = cljs.core.nth.call(null,vec__3516,0,null);
var gr__$1 = cljs.core.nthnext.call(null,vec__3516,1);
if(cljs.core.truth_(g0__$1))
{var temp__3974__auto__ = g0__$1.call(null,b__$3);
if(cljs.core.truth_(temp__3974__auto__))
{var b__$4 = temp__3974__auto__;
{
var G__3517 = b__$4;
var G__3518 = gr__$1;
b__$2 = G__3517;
G__3514__$1 = G__3518;
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
return cljs.core.logic._ifu.call(null,b.call(null),gs,c);
})));
});
cljs.core.logic.Inc.prototype.cljs$core$logic$IIfA$ = true;
cljs.core.logic.Inc.prototype.cljs$core$logic$IIfA$_ifa$arity$3 = (function (b,gs,c){
return (new cljs.core.logic.Inc((function (){
return cljs.core.logic._ifa.call(null,b.call(null),gs,c);
})));
});
cljs.core.logic.Choice.prototype.cljs$core$logic$IIfA$ = true;
cljs.core.logic.Choice.prototype.cljs$core$logic$IIfA$_ifa$arity$3 = (function (b,gs,c){
return cljs.core.reduce.call(null,cljs.core.logic._bind,b,gs);
});
cljs.core.logic.Choice.prototype.cljs$core$logic$IIfU$ = true;
cljs.core.logic.Choice.prototype.cljs$core$logic$IIfU$_ifu$arity$3 = (function (b,gs,c){
return cljs.core.reduce.call(null,cljs.core.logic._bind,b.a,gs);
});
/**
* A relation where a is nil
*/
cljs.core.logic.nilo = (function nilo(a){
return (function (a__3079__auto__){
var temp__3971__auto__ = cljs.core.logic._unify.call(null,a__3079__auto__,null,a);
if(cljs.core.truth_(temp__3971__auto__))
{var b__3080__auto__ = temp__3971__auto__;
return b__3080__auto__;
} else
{return null;
}
});
});
/**
* A relation where a is the empty list
*/
cljs.core.logic.emptyo = (function emptyo(a){
return (function (a__3079__auto__){
var temp__3971__auto__ = cljs.core.logic._unify.call(null,a__3079__auto__,cljs.core.List.EMPTY,a);
if(cljs.core.truth_(temp__3971__auto__))
{var b__3080__auto__ = temp__3971__auto__;
return b__3080__auto__;
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
return (function (a__3079__auto__){
var temp__3971__auto__ = cljs.core.logic._unify.call(null,a__3079__auto__,cljs.core.logic.lcons.call(null,a,d),l);
if(cljs.core.truth_(temp__3971__auto__))
{var b__3080__auto__ = temp__3971__auto__;
return b__3080__auto__;
} else
{return null;
}
});
});
/**
* A relation where l is a collection, such that a is the first of l
*/
cljs.core.logic.firsto = (function firsto(l,a){
return (function (a__3091__auto__){
return (new cljs.core.logic.Inc((function (){
var d = cljs.core.logic.lvar.call(null,"\uFDD1'd");
return cljs.core.logic._bind.call(null,a__3091__auto__,cljs.core.logic.conso.call(null,a,d,l));
})));
});
});
/**
* A relation where l is a collection, such that d is the rest of l
*/
cljs.core.logic.resto = (function resto(l,d){
return (function (a__3091__auto__){
return (new cljs.core.logic.Inc((function (){
var a = cljs.core.logic.lvar.call(null,"\uFDD1'a");
return cljs.core.logic._bind.call(null,a__3091__auto__,(function (a__3079__auto__){
var temp__3971__auto__ = cljs.core.logic._unify.call(null,a__3079__auto__,cljs.core.logic.lcons.call(null,a,d),l);
if(cljs.core.truth_(temp__3971__auto__))
{var b__3080__auto__ = temp__3971__auto__;
return b__3080__auto__;
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
return (function (a3520){
return (new cljs.core.logic.Inc((function (){
return cljs.core.logic._mplus.call(null,cljs.core.logic._bind.call(null,a3520,(function (a__3091__auto__){
return (new cljs.core.logic.Inc((function (){
var tail = cljs.core.logic.lvar.call(null,"\uFDD1'tail");
return cljs.core.logic._bind.call(null,a__3091__auto__,(function (a__3079__auto__){
var temp__3971__auto__ = cljs.core.logic._unify.call(null,a__3079__auto__,cljs.core.logic.lcons.call(null,x,tail),l);
if(cljs.core.truth_(temp__3971__auto__))
{var b__3080__auto__ = temp__3971__auto__;
return b__3080__auto__;
} else
{return null;
}
}));
})));
})),(new cljs.core.logic.Inc((function (){
return cljs.core.logic._bind.call(null,a3520,(function (a__3091__auto__){
return (new cljs.core.logic.Inc((function (){
var head = cljs.core.logic.lvar.call(null,"\uFDD1'head");
var tail = cljs.core.logic.lvar.call(null,"\uFDD1'tail");
return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__3091__auto__,(function (a__3079__auto__){
var temp__3971__auto__ = cljs.core.logic._unify.call(null,a__3079__auto__,cljs.core.logic.lcons.call(null,head,tail),l);
if(cljs.core.truth_(temp__3971__auto__))
{var b__3080__auto__ = temp__3971__auto__;
return b__3080__auto__;
} else
{return null;
}
})),membero.call(null,x,tail));
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
return (function (a3522){
return (new cljs.core.logic.Inc((function (){
return cljs.core.logic._mplus.call(null,cljs.core.logic._bind.call(null,a3522,(function (a__3091__auto__){
return (new cljs.core.logic.Inc((function (){
return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__3091__auto__,(function (a__3079__auto__){
var temp__3971__auto__ = cljs.core.logic._unify.call(null,a__3079__auto__,cljs.core.List.EMPTY,x);
if(cljs.core.truth_(temp__3971__auto__))
{var b__3080__auto__ = temp__3971__auto__;
return b__3080__auto__;
} else
{return null;
}
})),(function (a__3091__auto____$1){
return (new cljs.core.logic.Inc((function (){
return cljs.core.logic._bind.call(null,a__3091__auto____$1,(function (a__3079__auto__){
var temp__3971__auto__ = cljs.core.logic._unify.call(null,a__3079__auto__,y,z);
if(cljs.core.truth_(temp__3971__auto__))
{var b__3080__auto__ = temp__3971__auto__;
return b__3080__auto__;
} else
{return null;
}
}));
})));
}));
})));
})),(new cljs.core.logic.Inc((function (){
return cljs.core.logic._bind.call(null,a3522,(function (a__3091__auto__){
return (new cljs.core.logic.Inc((function (){
var a = cljs.core.logic.lvar.call(null,"\uFDD1'a");
var d = cljs.core.logic.lvar.call(null,"\uFDD1'd");
return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__3091__auto__,(function (a__3079__auto__){
var temp__3971__auto__ = cljs.core.logic._unify.call(null,a__3079__auto__,cljs.core.logic.lcons.call(null,a,d),x);
if(cljs.core.truth_(temp__3971__auto__))
{var b__3080__auto__ = temp__3971__auto__;
return b__3080__auto__;
} else
{return null;
}
})),(function (a__3091__auto____$1){
return (new cljs.core.logic.Inc((function (){
var r = cljs.core.logic.lvar.call(null,"\uFDD1'r");
return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__3091__auto____$1,(function (a__3079__auto__){
var temp__3971__auto__ = cljs.core.logic._unify.call(null,a__3079__auto__,cljs.core.logic.lcons.call(null,a,r),z);
if(cljs.core.truth_(temp__3971__auto__))
{var b__3080__auto__ = temp__3971__auto__;
return b__3080__auto__;
} else
{return null;
}
})),appendo.call(null,d,y,r));
})));
}));
})));
}));
}))));
})));
});
});
cljs.core.logic.prefix = (function prefix(s,_LT_s){
if(cljs.core._EQ_.call(null,s,_LT_s))
{return cljs.core.List.EMPTY;
} else
{return cljs.core.conj.call(null,prefix.call(null,cljs.core.rest.call(null,s),_LT_s),cljs.core.first.call(null,s));
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
{var x__2565__auto__ = (((pmap == null))?null:pmap);
return (function (){var or__3824__auto__ = (cljs.core.logic.unify_with_pmap[goog.typeOf(x__2565__auto__)]);
if(or__3824__auto__)
{return or__3824__auto__;
} else
{var or__3824__auto____$1 = (cljs.core.logic.unify_with_pmap["_"]);
if(or__3824__auto____$1)
{return or__3824__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"IUnifyWithPMap.unify-with-pmap",pmap);
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
cljs.core.logic.PMap.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__2518__auto__){
var self__ = this;
var h__2388__auto__ = self__.__hash;
if(!((h__2388__auto__ == null)))
{return h__2388__auto__;
} else
{var h__2388__auto____$1 = cljs.core.hash_imap.call(null,this__2518__auto__);
self__.__hash = h__2388__auto____$1;
return h__2388__auto____$1;
}
});
cljs.core.logic.PMap.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__2523__auto__,k__2524__auto__){
var self__ = this;
return this__2523__auto__.cljs$core$ILookup$_lookup$arity$3(this__2523__auto__,k__2524__auto__,null);
});
cljs.core.logic.PMap.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__2525__auto__,k3524,else__2526__auto__){
var self__ = this;
if("\uFDD0'else")
{return cljs.core._lookup.call(null,self__.__extmap,k3524,else__2526__auto__);
} else
{return null;
}
});
cljs.core.logic.PMap.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__2530__auto__,k__2531__auto__,G__3523){
var self__ = this;
var pred__3526 = cljs.core.identical_QMARK_;
var expr__3527 = k__2531__auto__;
return (new cljs.core.logic.PMap(self__.__meta,cljs.core.assoc.call(null,self__.__extmap,k__2531__auto__,G__3523),null));
});
cljs.core.logic.PMap.prototype.cljs$core$logic$IUnifyWithLVar$ = true;
cljs.core.logic.PMap.prototype.cljs$core$logic$IUnifyWithLVar$_unify_with_lvar$arity$3 = (function (v,u,s){
var self__ = this;
return cljs.core.logic._ext_no_check.call(null,s,u,v);
});
cljs.core.logic.PMap.prototype.cljs$core$logic$IUnifyTerms$ = true;
cljs.core.logic.PMap.prototype.cljs$core$logic$IUnifyTerms$_unify_terms$arity$3 = (function (u,v,s){
var self__ = this;
return cljs.core.logic.unify_with_pmap.call(null,v,u,s);
});
cljs.core.logic.PMap.prototype.cljs$core$logic$IUnifyWithMap$ = true;
cljs.core.logic.PMap.prototype.cljs$core$logic$IUnifyWithMap$_unify_with_map$arity$3 = (function (v,u,s){
var self__ = this;
var ks = cljs.core.keys.call(null,v);
var s__$1 = s;
while(true){
if(cljs.core.seq.call(null,ks))
{var kf = cljs.core.first.call(null,ks);
var uf = cljs.core._lookup.call(null,u,kf,"\uFDD0'cljs.core.logic/not-found");
if(cljs.core._EQ_.call(null,uf,"\uFDD0'cljs.core.logic/not-found"))
{return null;
} else
{var temp__3971__auto__ = cljs.core.logic._unify.call(null,s__$1,v.cljs$core$ILookup$_lookup$arity$3(v,kf,null),uf);
if(cljs.core.truth_(temp__3971__auto__))
{var s__$2 = temp__3971__auto__;
{
var G__3529 = cljs.core.next.call(null,ks);
var G__3530 = s__$2;
ks = G__3529;
s__$1 = G__3530;
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
cljs.core.logic.PMap.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__2537__auto__,writer__2538__auto__,opts__2539__auto__){
var self__ = this;
var pr_pair__2540__auto__ = (function (keyval__2541__auto__){
return cljs.core.pr_sequential_writer.call(null,writer__2538__auto__,cljs.core.pr_writer,""," ","",opts__2539__auto__,keyval__2541__auto__);
});
return cljs.core.pr_sequential_writer.call(null,writer__2538__auto__,pr_pair__2540__auto__,[cljs.core.str("#"),cljs.core.str("PMap"),cljs.core.str("{")].join(''),", ","}",opts__2539__auto__,cljs.core.concat.call(null,cljs.core.PersistentVector.EMPTY,self__.__extmap));
});
cljs.core.logic.PMap.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__2528__auto__,entry__2529__auto__){
var self__ = this;
if(cljs.core.vector_QMARK_.call(null,entry__2529__auto__))
{return this__2528__auto__.cljs$core$IAssociative$_assoc$arity$3(this__2528__auto__,cljs.core._nth.call(null,entry__2529__auto__,0),cljs.core._nth.call(null,entry__2529__auto__,1));
} else
{return cljs.core.reduce.call(null,cljs.core._conj,this__2528__auto__,entry__2529__auto__);
}
});
cljs.core.logic.PMap.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__2535__auto__){
var self__ = this;
return cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core.PersistentVector.EMPTY,self__.__extmap));
});
cljs.core.logic.PMap.prototype.cljs$core$logic$IWalkTerm$ = true;
cljs.core.logic.PMap.prototype.cljs$core$logic$IWalkTerm$_walk_term$arity$2 = (function (v,s){
var self__ = this;
return cljs.core.logic.walk_term_map_STAR_.call(null,v,s);
});
cljs.core.logic.PMap.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__2527__auto__){
var self__ = this;
return (0 + cljs.core.count.call(null,self__.__extmap));
});
cljs.core.logic.PMap.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this__2519__auto__,other__2520__auto__){
var self__ = this;
if(cljs.core.truth_((function (){var and__3822__auto__ = other__2520__auto__;
if(cljs.core.truth_(and__3822__auto__))
{var and__3822__auto____$1 = (this__2519__auto__.constructor === other__2520__auto__.constructor);
if(and__3822__auto____$1)
{return cljs.core.equiv_map.call(null,this__2519__auto__,other__2520__auto__);
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
cljs.core.logic.PMap.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__2522__auto__,G__3523){
var self__ = this;
return (new cljs.core.logic.PMap(G__3523,self__.__extmap,self__.__hash));
});
cljs.core.logic.PMap.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__2521__auto__){
var self__ = this;
return self__.__meta;
});
cljs.core.logic.PMap.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__2532__auto__,k__2533__auto__){
var self__ = this;
if(cljs.core.contains_QMARK_.call(null,cljs.core.PersistentHashSet.EMPTY,k__2533__auto__))
{return cljs.core.dissoc.call(null,cljs.core.with_meta.call(null,cljs.core.into.call(null,cljs.core.ObjMap.EMPTY,this__2532__auto__),self__.__meta),k__2533__auto__);
} else
{return (new cljs.core.logic.PMap(self__.__meta,cljs.core.not_empty.call(null,cljs.core.dissoc.call(null,self__.__extmap,k__2533__auto__)),null));
}
});
cljs.core.logic.PMap.cljs$lang$type = true;
cljs.core.logic.PMap.cljs$lang$ctorPrSeq = (function (this__2558__auto__){
return cljs.core.list.call(null,"cljs.core.logic/PMap");
});
cljs.core.logic.PMap.cljs$lang$ctorPrWriter = (function (this__2558__auto__,writer__2559__auto__){
return cljs.core._write.call(null,writer__2559__auto__,"cljs.core.logic/PMap");
});
cljs.core.logic.__GT_PMap = (function __GT_PMap(){
return (new cljs.core.logic.PMap());
});
cljs.core.logic.map__GT_PMap = (function map__GT_PMap(G__3525){
return (new cljs.core.logic.PMap(null,cljs.core.dissoc.call(null,G__3525)));
});
cljs.core.logic.PMap;
cljs.core.PersistentHashMap.prototype.cljs$core$logic$IUnifyWithPMap$ = true;
cljs.core.PersistentHashMap.prototype.cljs$core$logic$IUnifyWithPMap$unify_with_pmap$arity$3 = (function (v,u,s){
return cljs.core.logic._unify_with_map.call(null,u,v,s);
});
cljs.core.PersistentArrayMap.prototype.cljs$core$logic$IUnifyWithPMap$ = true;
cljs.core.PersistentArrayMap.prototype.cljs$core$logic$IUnifyWithPMap$unify_with_pmap$arity$3 = (function (v,u,s){
return cljs.core.logic._unify_with_map.call(null,u,v,s);
});
cljs.core.ObjMap.prototype.cljs$core$logic$IUnifyWithPMap$ = true;
cljs.core.ObjMap.prototype.cljs$core$logic$IUnifyWithPMap$unify_with_pmap$arity$3 = (function (v,u,s){
return cljs.core.logic._unify_with_map.call(null,u,v,s);
});
cljs.core.logic.LVar.prototype.cljs$core$logic$IUnifyWithPMap$ = true;
cljs.core.logic.LVar.prototype.cljs$core$logic$IUnifyWithPMap$unify_with_pmap$arity$3 = (function (v,u,s){
return cljs.core.logic._ext.call(null,s,v,u);
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
return cljs.core.logic.map__GT_PMap.call(null,m);
});
cljs.core.logic.lvarq_sym_QMARK_ = (function lvarq_sym_QMARK_(s){
var and__3822__auto__ = cljs.core.symbol_QMARK_.call(null,s);
if(and__3822__auto__)
{return cljs.core._EQ_.call(null,cljs.core.first.call(null,[cljs.core.str(s)].join('')),"?");
} else
{return and__3822__auto__;
}
});
cljs.core.logic.proc_lvar = (function proc_lvar(lvar_expr,store){
var v = (function (){var temp__3971__auto__ = cljs.core.deref.call(null,store).call(null,lvar_expr);
if(cljs.core.truth_(temp__3971__auto__))
{var u = temp__3971__auto__;
return u;
} else
{return cljs.core.logic.lvar.call(null,lvar_expr);
}
})();
cljs.core.swap_BANG_.call(null,store,cljs.core.conj,cljs.core.PersistentVector.fromArray([lvar_expr,v], true));
return v;
});
cljs.core.logic.lcons_expr_QMARK_ = (function lcons_expr_QMARK_(expr){
var and__3822__auto__ = cljs.core.seq_QMARK_.call(null,expr);
if(and__3822__auto__)
{return cljs.core.some.call(null,cljs.core.set(["\uFDD1'."]),cljs.core.set.call(null,expr));
} else
{return and__3822__auto__;
}
});
cljs.core.logic.replace_lvar = (function replace_lvar(store){
return (function (expr){
if(cljs.core.truth_(cljs.core.logic.lvarq_sym_QMARK_.call(null,expr)))
{return cljs.core.logic.proc_lvar.call(null,expr,store);
} else
{if(cljs.core.truth_(cljs.core.logic.lcons_expr_QMARK_.call(null,expr)))
{return cljs.core.logic.prep_STAR_.call(null,expr,store);
} else
{return expr;
}
}
});
});
cljs.core.logic.prep_STAR_ = (function() {
var prep_STAR_ = null;
var prep_STAR___2 = (function (expr,store){
return prep_STAR_.call(null,expr,store,false,false);
});
var prep_STAR___3 = (function (expr,store,lcons_QMARK_){
return prep_STAR_.call(null,expr,store,lcons_QMARK_,false);
});
var prep_STAR___4 = (function (expr,store,lcons_QMARK_,last_QMARK_){
var expr__$1 = (cljs.core.truth_((function (){var and__3822__auto__ = last_QMARK_;
if(cljs.core.truth_(and__3822__auto__))
{return cljs.core.seq.call(null,expr);
} else
{return and__3822__auto__;
}
})())?cljs.core.first.call(null,expr):expr);
if(cljs.core.truth_(cljs.core.logic.lvarq_sym_QMARK_.call(null,expr__$1)))
{return cljs.core.logic.proc_lvar.call(null,expr__$1,store);
} else
{if(cljs.core.seq_QMARK_.call(null,expr__$1))
{if(cljs.core.truth_((function (){var or__3824__auto__ = lcons_QMARK_;
if(cljs.core.truth_(or__3824__auto__))
{return or__3824__auto__;
} else
{return cljs.core.logic.lcons_expr_QMARK_.call(null,expr__$1);
}
})()))
{var vec__3532 = expr__$1;
var f = cljs.core.nth.call(null,vec__3532,0,null);
var n = cljs.core.nthnext.call(null,vec__3532,1);
var skip = cljs.core._EQ_.call(null,f,"\uFDD1'.");
var tail = prep_STAR_.call(null,n,store,lcons_QMARK_,skip);
if(skip)
{return tail;
} else
{return cljs.core.logic.lcons.call(null,prep_STAR_.call(null,f,store),tail);
}
} else
{return clojure.walk.postwalk.call(null,cljs.core.logic.replace_lvar.call(null,store),expr__$1);
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
var lvars = cljs.core.atom.call(null,cljs.core.ObjMap.EMPTY);
var prepped = (cljs.core.truth_(cljs.core.logic.lcons_expr_QMARK_.call(null,expr))?cljs.core.logic.prep_STAR_.call(null,expr,lvars,true):clojure.walk.postwalk.call(null,cljs.core.logic.replace_lvar.call(null,lvars),expr));
return cljs.core.with_meta.call(null,prepped,cljs.core.ObjMap.fromObject(["\uFDD0'lvars"],{"\uFDD0'lvars":cljs.core.deref.call(null,lvars)}));
});
cljs.core.logic.unify = (function unify(s,u,v){
if((u === v))
{return s;
} else
{var u__$1 = cljs.core.logic._walk.call(null,s,u);
var v__$1 = cljs.core.logic._walk.call(null,s,v);
if((u__$1 === v__$1))
{return s;
} else
{return cljs.core.logic._unify_terms.call(null,u__$1,v__$1,s);
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
return cljs.core.first.call(null,cljs.core.doall.call(null,(function (){var xs__3099__auto__ = cljs.core.logic._take_STAR_.call(null,(new cljs.core.logic.Inc((function (){
return (function (a__3091__auto__){
return (new cljs.core.logic.Inc((function (){
var q = cljs.core.logic.lvar.call(null,"\uFDD1'q");
return cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,cljs.core.logic._bind.call(null,a__3091__auto__,(function (a__3079__auto__){
var temp__3971__auto__ = cljs.core.logic._unify.call(null,a__3079__auto__,u,w);
if(cljs.core.truth_(temp__3971__auto__))
{var b__3080__auto__ = temp__3971__auto__;
return b__3080__auto__;
} else
{return null;
}
})),(function (a__3079__auto__){
var temp__3971__auto__ = cljs.core.logic._unify.call(null,a__3079__auto__,u,q);
if(cljs.core.truth_(temp__3971__auto__))
{var b__3080__auto__ = temp__3971__auto__;
return b__3080__auto__;
} else
{return null;
}
})),(function (a__3100__auto__){
return cljs.core.cons.call(null,cljs.core.logic._reify.call(null,a__3100__auto__,q),cljs.core.List.EMPTY);
}));
})));
}).call(null,cljs.core.logic.empty_s);
}))));
if(false)
{return cljs.core.take.call(null,false,xs__3099__auto__);
} else
{return xs__3099__auto__;
}
})()));
});
var unifier_STAR___3 = (function() { 
var G__3533__delegate = function (u,w,ts){
return cljs.core.apply.call(null,unifier_STAR_,unifier_STAR_.call(null,u,w),ts);
};
var G__3533 = function (u,w,var_args){
var ts = null;
if (goog.isDef(var_args)) {
  ts = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__3533__delegate.call(this, u, w, ts);
};
G__3533.cljs$lang$maxFixedArity = 2;
G__3533.cljs$lang$applyTo = (function (arglist__3534){
var u = cljs.core.first(arglist__3534);
var w = cljs.core.first(cljs.core.next(arglist__3534));
var ts = cljs.core.rest(cljs.core.next(arglist__3534));
return G__3533__delegate(u, w, ts);
});
G__3533.cljs$lang$arity$variadic = G__3533__delegate;
return G__3533;
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
var lvars = cljs.core.merge.call(null,(new cljs.core.Keyword("\uFDD0'lvars")).call(null,cljs.core.meta.call(null,u)),(new cljs.core.Keyword("\uFDD0'lvars")).call(null,cljs.core.meta.call(null,w)));
var s = cljs.core.logic.unify.call(null,cljs.core.logic.empty_s,u,w);
if(cljs.core.truth_(s))
{return cljs.core.into.call(null,cljs.core.ObjMap.EMPTY,cljs.core.map.call(null,(function (p__3537){
var vec__3538 = p__3537;
var k = cljs.core.nth.call(null,vec__3538,0,null);
var v = cljs.core.nth.call(null,vec__3538,1,null);
return cljs.core.PersistentVector.fromArray([k,cljs.core.logic._reify.call(null,s,v)], true);
}),lvars));
} else
{return null;
}
});
var binding_map_STAR___3 = (function() { 
var G__3539__delegate = function (u,w,ts){
return cljs.core.apply.call(null,binding_map_STAR_,binding_map_STAR_.call(null,u,w),ts);
};
var G__3539 = function (u,w,var_args){
var ts = null;
if (goog.isDef(var_args)) {
  ts = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__3539__delegate.call(this, u, w, ts);
};
G__3539.cljs$lang$maxFixedArity = 2;
G__3539.cljs$lang$applyTo = (function (arglist__3540){
var u = cljs.core.first(arglist__3540);
var w = cljs.core.first(cljs.core.next(arglist__3540));
var ts = cljs.core.rest(cljs.core.next(arglist__3540));
return G__3539__delegate(u, w, ts);
});
G__3539.cljs$lang$arity$variadic = G__3539__delegate;
return G__3539;
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
if(!(cljs.core.logic.lcons_QMARK_.call(null,u)))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.with_meta(cljs.core.list("\uFDD1'not",cljs.core.with_meta(cljs.core.list("\uFDD1'lcons?","\uFDD1'u"),cljs.core.hash_map("\uFDD0'line",980))),cljs.core.hash_map("\uFDD0'line",980))))].join('')));
}
if(!(cljs.core.logic.lcons_QMARK_.call(null,w)))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.with_meta(cljs.core.list("\uFDD1'not",cljs.core.with_meta(cljs.core.list("\uFDD1'lcons?","\uFDD1'w"),cljs.core.hash_map("\uFDD0'line",981))),cljs.core.hash_map("\uFDD0'line",981))))].join('')));
}
var up = cljs.core.logic.prep.call(null,u);
var wp = cljs.core.logic.prep.call(null,w);
return cljs.core.logic.unifier_STAR_.call(null,up,wp);
});
var unifier__3 = (function() { 
var G__3541__delegate = function (u,w,ts){
return cljs.core.apply.call(null,unifier,unifier.call(null,u,w),ts);
};
var G__3541 = function (u,w,var_args){
var ts = null;
if (goog.isDef(var_args)) {
  ts = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__3541__delegate.call(this, u, w, ts);
};
G__3541.cljs$lang$maxFixedArity = 2;
G__3541.cljs$lang$applyTo = (function (arglist__3542){
var u = cljs.core.first(arglist__3542);
var w = cljs.core.first(cljs.core.next(arglist__3542));
var ts = cljs.core.rest(cljs.core.next(arglist__3542));
return G__3541__delegate(u, w, ts);
});
G__3541.cljs$lang$arity$variadic = G__3541__delegate;
return G__3541;
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
if(!(cljs.core.logic.lcons_QMARK_.call(null,u)))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.with_meta(cljs.core.list("\uFDD1'not",cljs.core.with_meta(cljs.core.list("\uFDD1'lcons?","\uFDD1'u"),cljs.core.hash_map("\uFDD0'line",992))),cljs.core.hash_map("\uFDD0'line",992))))].join('')));
}
if(!(cljs.core.logic.lcons_QMARK_.call(null,w)))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.with_meta(cljs.core.list("\uFDD1'not",cljs.core.with_meta(cljs.core.list("\uFDD1'lcons?","\uFDD1'w"),cljs.core.hash_map("\uFDD0'line",993))),cljs.core.hash_map("\uFDD0'line",993))))].join('')));
}
var up = cljs.core.logic.prep.call(null,u);
var wp = cljs.core.logic.prep.call(null,w);
return cljs.core.logic.binding_map_STAR_.call(null,up,wp);
});
var binding_map__3 = (function() { 
var G__3543__delegate = function (u,w,ts){
return cljs.core.apply.call(null,binding_map,binding_map.call(null,u,w),ts);
};
var G__3543 = function (u,w,var_args){
var ts = null;
if (goog.isDef(var_args)) {
  ts = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__3543__delegate.call(this, u, w, ts);
};
G__3543.cljs$lang$maxFixedArity = 2;
G__3543.cljs$lang$applyTo = (function (arglist__3544){
var u = cljs.core.first(arglist__3544);
var w = cljs.core.first(cljs.core.next(arglist__3544));
var ts = cljs.core.rest(cljs.core.next(arglist__3544));
return G__3543__delegate(u, w, ts);
});
G__3543.cljs$lang$arity$variadic = G__3543__delegate;
return G__3543;
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
