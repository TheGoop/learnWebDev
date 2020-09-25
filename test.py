class Solution(object):
    
    
    
    
    
    def numIslands(self, grid):
        """
        :type grid: List[List[str]]
        :rtype: int
        """
        
        #could approach in a sort of dfs manner
        #start at a 1, search neighboring nodes
            # when searching these adjacent nodes, marked them as "discovered"
            # and if theyre a "1" append to a list to visit next iteration
            # once list is empty, we have discovered the entire island, 
                # increment count
            # after list is empty, call a function to find an undiscovered "1"
                # if none of such exist, return count
        
        #Returns coords of an undiscovered land in grid, else returns None
        def getUndiscoveredLand(grid, visited, allLand, LAND):
        	for coord in allLand:
        		r, c = coord
        		if not visited[r][c]:
        			return (r,c)
        	return None
        
        def getAllUndiscoveredLand(grid, LAND):
            nodes = []
            for r in range(len(grid)):
                for c in range(len(grid[r])):
                    if grid[r][c] == LAND:
                        nodes.append((r,c))

            if nodes == []:
            	return None

            return nodes
        
        
        #returns if r,c are valid coords within grid boundaries
        def validCoords(r, c, grid):
            if 0 <= r and r < len(grid) and 0 <= c and c < len(grid[r]):
                return True
            else:
                return False
                
        
        #checks all adjacent nodes to grid[row][col] to see if they are land 
        #and not visited, returns list of all nodes meeting criterion
        def getAdjacents(row, col, grid, visited, LAND):
            
            s = []
            
            #check coord north
            r = row + 1
            c = col
            if (validCoords(r, c, grid) and grid[r][c] == LAND and not visited[r][c]):
                s.append((r,c))
            
            #check coord south
            r = row - 1
            c = col
            if (validCoords(r, c, grid) and grid[r][c] == LAND and not visited[r][c]):
                s.append((r,c))
            
            #check coord east
            r = row
            c = col + 1
            if (validCoords(r, c, grid) and grid[r][c] == LAND and not visited[r][c]):
                s.append((r,c))
            
            #checks coord west
            r = row 
            c = col - 1
            if (validCoords(r, c, grid) and grid[r][c] == LAND and not visited[r][c]):
                s.append((r,c))
            
            if (len(s) > 0):
                return s
            return None
        
        if (grid == None or len(grid) == 0 ):
            return 0
        
        
        LAND = "1"
        
        visited = []
        for row in grid:
            temp = []
            for i in range(len(row)):
                temp.append(False)
            visited.append(temp)

        toVisit = []
        islands = 0
        allLand = getAllUndiscoveredLand(grid, LAND)
        if allLand == None:
        	return 0
        
        coord = getUndiscoveredLand(grid, visited, allLand, LAND)
        #if no land, returns 0
        if coord == None:
            return islands
        
        toVisit.append(coord)
        while (True):
            #dfs of toVisit
            while (len(toVisit) != 0):
                r, c = toVisit.pop()
                visited[r][c] = True
                
                #search adjacent nodes of r,c
                #if any unvisited adjacents are land, add to toVisit
                toSearch = getAdjacents(r, c, grid, visited, LAND)
                
                if toSearch != None:
                    toVisit.extend(toSearch)
                
            
            #increment counter, we have just finished iterating through a land mass
            islands += 1
            coord = getUndiscoveredLand(grid, visited, allLand, LAND)
            
            #if no undiscovered lands left, return island count
            if coord == None:
                return islands
            #else, append new coord and begin dfs again
            toVisit.append(coord)
        
        return islands

def test():
	grid = [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]
	x = Solution()
	print(x.numIslands(grid))


def validCoords(grid, r, c):
    return 0 <= r and r < len(grid) and 0 <= c and c < len(grid[r])

def drownIslandAt(grid, r, c):
    if (validCoords(grid, r, c) and grid[r][c] == "1"):
        grid[r][c] = '0'
        grid = drownIslandAt(grid, r+1, c)
        grid = drownIslandAt(grid, r-1, c)
        grid = drownIslandAt(grid, r, c+1)
        grid = drownIslandAt(grid, r, c-1)
    return grid

grid = [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]
for row in grid:
	print(row)

grid = drownIslandAt(grid, 3, 3)
print("Result")
for row in grid: 
	print (row)