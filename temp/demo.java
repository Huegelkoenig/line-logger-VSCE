/*LL*//*LL:L*//*LL:R*/
/*LL*//*LL:R*//*LL:L*/
/*LL:L*//*LL*//*LL:R*/
/*LL:L*//*LL:R*//*LL*/
/*LL:R*//*LL*//*LL:L*/
/*LL:R*//*LL:L*//*LL*/



































































































//Java
System.out.println("Nothing wrong with line " + 107/*LL*/);
//>> "Nothing wrong with line 107"
System.out.println("Line " + /*LL*/109 + "is also perfectly fine");
//>> "Line 109 is also perfectly fine"
System.out.println("This will produce an error: " + 111/*LL*/111);
//Depending on your programming language this might not produce an error, but would result in something like
//>> "This will produce an error: 111111"



