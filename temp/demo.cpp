using namespace std;

int doSomething(){ //this is broken and needs to be debuged
  int var = 4;
  cout << "function doSomething() was called with param " << param << "\n";
  //some code
  cout << "function doSomething(), line " << /*LL*/ << ": The value of var is " << var << "\n";
  //some more code


  //C++
  int solution = doSomething();
  cout << "The returned value of function doSomething() on line " << /*LL*/ << " is " << solution << ".\n";
  //>> "The returned value of function doSomething() on line 13 is 42."
  cout << "Line /*LL*/ looks wrong, but is syntactic correct. This would work, too.\n";
  //>> "Line /*LL*/ looks wrong, but is syntactic correct. This would work, too."
  for (int i=0; i</*LL*/;i++){
      cout << "This makes no sense, but it works!\n";
  }



  //some code
  return var;
}

int main()
{
  int returnValue = doSomething(5);
  cout << "function main(): The function doSomething() on line " << /*LL:R*/16 -1 << " returned " << returnValue << "\n";  
}

/*LL*//*LL:L*//*LL:R*/
/*LL*//*LL:R*//*LL:L*/
/*LL:L*//*LL*//*LL:R*/
/*LL:L*//*LL:R*//*LL*/
/*LL:R*//*LL*//*LL:L*/
/*LL:R*//*LL:L*//*LL*/





