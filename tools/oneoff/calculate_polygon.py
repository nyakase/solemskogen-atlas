from PIL import Image
import cv2
import numpy

def pongon(template: Image, xOffset: int, yOffset: int):
	alpha = numpy.array(template)[:, :, 3]
	_, mask = cv2.threshold(alpha, 1, 255, cv2.THRESH_BINARY)
	contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

	if len(contours) > 1:
		all_points = numpy.vstack(contours).squeeze()
		hull = cv2.convexHull(all_points)
		polygon = hull.reshape(-1, 2).tolist()
	else:
		polygon = contours[0].reshape(-1, 2).tolist()

	return [[x + xOffset, y + yOffset] for x, y in polygon]