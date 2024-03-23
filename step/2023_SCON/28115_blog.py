n = int(input())
A = list(map(int,input().split()))
B = []
C = []
d = A[1] - A[0]

def checkValidate () :
  for i in range(0, n - 1 ,1) : 
    if (d != A[i + 1] - A[i]) : return False
  return True


def makeBnC () :
  for i in range(0, n ,1) : 
    B.append(A[i] * 2)
    C.append(-A[i])

if checkValidate() :
  makeBnC()
  print('YES')
  print(" ".join(map(str, B)))
  print(" ".join(map(str, C)))
else :
  print('NO')
  

