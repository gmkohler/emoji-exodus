"""Utilities for iterables."""
def each_slice(iterable, slice_size):
    """
    Chunks the iterable into size elements at a time, each yielded as a list.

    Example:
      for chunk in each_slice([1,2,3,4,5], slice_size=2):
          print(chunk)

      # output:
      [1, 2]
      [3, 4]
      [5]
    """
    current_slice = []
    for item in iterable:
        current_slice.append(item)
        if len(current_slice) >= slice_size:
            yield current_slice
            current_slice = []
    if current_slice:
        yield current_slice
