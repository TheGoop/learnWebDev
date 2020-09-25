mTable = dict()
def dp(s, index):
    
    #the combo e have come up with up until this point is a possible message, prevent Index out of Bounds
    if index == len(s):
        return 1
    
    #edge case 0, return 0 because 0 is not allowed
    if (s[index] == "0"):
        return 0
    
    #if one before the end, only one possibility to decode, take last char as only decoding
    if index == len(s)-1: 
        return 1
    
    if index in mTable:
        return mTable[index]
    #considering next character as a possible decoding on its own, i.e. 12, 1 is its own decoding
    #examine combos branch resulting from this conclusion
    combos = dp(s, index+1)
    
    #now, we consider if next character and one after is its own decoding, i.e. 12 is its own decoding
    #we know int conversion will work because problem guarentees string is only composed of digits
    if (int(s[index: index + 2]) <= 26):
        #we add number of combos from this possibility branch to our current count
        combos += dp(s, index+2)
        
    mTable[index] = combos
    
    return combos

print(dp("12", 0))