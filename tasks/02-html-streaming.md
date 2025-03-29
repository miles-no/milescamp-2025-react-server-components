# Task 2: Handle Slow API Calls Without Blocking UI

## Objective
Implement proper handling of slow API calls in the application to ensure the main UI remains responsive and interactive, even when some parts of the page are still loading.

## Current Implementation
The current implementation:
- Uses a single loading state for the entire page
- Shows a simple spinner while all data is loading
- Blocks the entire page when any API call is slow
- Doesn't handle slow API calls independently
  
## Requirements
1. Create loading.tsx files at the page level
2. Implement streaming for the products list
3. Keep the cart section interactive while products are loading
4. Use skeleton loading states for better UX
5. Implement proper error boundaries
6. Handle slow API calls (like the promotion banner) without blocking the main UI

## Steps
1. Create loading.tsx in the products directory
2. Design skeleton UI components for products and promotion banner
3. Split the page into streaming and non-streaming sections
4. Implement error.tsx for error handling
5. Test different loading scenarios
6. Ensure the promotion banner's slow loading (2s delay) doesn't block the products from rendering

## Expected Outcome
- Faster perceived performance
- Better user experience with skeleton loading
- Progressive loading of content
- Maintained interactivity during loading
- Proper error handling
- Main UI remains responsive even with slow API calls

## Tips
- Use Next.js 13+ loading.tsx convention
- Design skeleton UI that matches the final layout
- Keep interactive elements available during streaming
- Use proper error boundaries with error.tsx
- Test with slow network conditions
- Consider using React Suspense for streaming
- Implement independent loading states for different sections

## Example Structure
```
app/
  products/
    loading.tsx    # Loading UI for products
    error.tsx      # Error UI for products
    page.tsx       # Main products page
    components/
      ProductSkeleton.tsx  # Skeleton UI component
      PromotionSkeleton.tsx  # Skeleton UI for promotion banner
```

## Real-world Example
In our application, we have a promotion banner that takes 2 seconds to load. Currently, this slow API call blocks the entire page from rendering. The goal is to:
1. Show a skeleton UI for the promotion banner
2. Allow the products to load and display immediately
3. Update the promotion banner when it's ready
4. Keep the cart interactive throughout the process 