using namespace std;

int doSomething(int param){ //this is broken and needs to be debuged
  int var = 4;
  cout << "function doSomething() was called with param " << param << "\n";
  //some code
  cout << "function doSomething(), line " << 6/*LL*/ << ": The value of var is " << var << "\n";
  //some more code
  cout << "function doSomething(), line " << 8/*LL:L*/ << ": The value of var is " << var << "\n";
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