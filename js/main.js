$(document).ready(function() {
	calcExtrusionData();
	calcUStepsTable();
});

$('#line_width').change(function() {
	calcExtrusionData();
});

$('#layer_height').change(function() {
	calcExtrusionData();
});

$('#flow').change(function() {
	calcExtrusionData();
});

$('#filament_diameter').change(function() {
	calcExtrusionData();
});

$('#segment_size').change(function() {
	calcExtrusionData();
	calcUStepsTable();
});

$('#extrusion_on_segment').on('change', function() {
	calcUStepsTable();
});

$('#extruder_steps').change(function() {
	calcUStepsTable();
});

$('#retraction_speed').change(function() {
	calcUStepsTable();
});

$('#step_rate').change(function() {
	calcUStepsTable();
});

$('#retraction_speed').change(function() {
	calcUStepsTable();
});

function calcUStepsTable() {
	var extruderSteps16 = parseFloat($('#extruder_steps').val());
	var stepRate = parseInt($('#step_rate').val()) * 1000;
	var retractionSpeed = parseInt($('#retraction_speed').val());
	var extrusionOnSegment = parseFloat($('#extrusion_on_segment').text());
	var segmentSize = parseFloat($('#segment_size').val());

	var extruderSteps1   = extruderSteps16/16,
		extruderSteps2   = extruderSteps16/8,
		extruderSteps4   = extruderSteps16/4,
		extruderSteps8   = extruderSteps16/2,
		extruderSteps32  = extruderSteps16*2,
		extruderSteps64  = extruderSteps16*4,
		extruderSteps128 = extruderSteps16*8,
		extruderSteps256 = extruderSteps16*16

	    mmUstep1   = 1/extruderSteps1,
		mmUstep2   = 1/extruderSteps2,
		mmUstep4   = 1/extruderSteps4,
		mmUstep8   = 1/extruderSteps8,
		mmUstep16  = 1/extruderSteps16,
		mmUstep32  = 1/extruderSteps32,
		mmUstep64  = 1/extruderSteps64,
		mmUstep128 = 1/extruderSteps128,
		mmUstep256 = 1/extruderSteps256

	    maxRetract1   = (stepRate/extruderSteps1)*60,
		maxRetract2   = (stepRate/extruderSteps2)*60,
		maxRetract4   = (stepRate/extruderSteps4)*60,
		maxRetract8   = (stepRate/extruderSteps8)*60,
		maxRetract16  = (stepRate/extruderSteps16)*60,
		maxRetract32  = (stepRate/extruderSteps32)*60,
		maxRetract64  = (stepRate/extruderSteps64)*60,
		maxRetract128 = (stepRate/extruderSteps128)*60,
		maxRetract256 = (stepRate/extruderSteps256)*60

	    uStepsOnSegment1   = (extrusionOnSegment/mmUstep1),
		uStepsOnSegment2   = (extrusionOnSegment/mmUstep2),
		uStepsOnSegment4   = (extrusionOnSegment/mmUstep4),
		uStepsOnSegment8   = (extrusionOnSegment/mmUstep8),
		uStepsOnSegment16  = (extrusionOnSegment/mmUstep16),
		uStepsOnSegment32  = (extrusionOnSegment/mmUstep32),
		uStepsOnSegment64  = (extrusionOnSegment/mmUstep64),
		uStepsOnSegment128 = (extrusionOnSegment/mmUstep128),
		uStepsOnSegment256 = (extrusionOnSegment/mmUstep256);

	$('#steps_mm_1').text(extruderSteps1.toFixed(3));
	$('#steps_mm_2').text(extruderSteps2.toFixed(3));
	$('#steps_mm_4').text(extruderSteps4.toFixed(3));
	$('#steps_mm_8').text(extruderSteps8.toFixed(3));
	$('#steps_mm_16').text(extruderSteps16.toFixed(3));
	$('#steps_mm_32').text(extruderSteps32.toFixed(3));
	$('#steps_mm_64').text(extruderSteps64.toFixed(3));
	$('#steps_mm_128').text(extruderSteps128.toFixed(3));
	$('#steps_mm_256').text(extruderSteps256.toFixed(3));

	$('#mm_ustep_1').text(mmUstep1.toFixed(5));
	$('#mm_ustep_2').text(mmUstep2.toFixed(5));
	$('#mm_ustep_4').text(mmUstep4.toFixed(5));
	$('#mm_ustep_8').text(mmUstep8.toFixed(5));
	$('#mm_ustep_16').text(mmUstep16.toFixed(5));
	$('#mm_ustep_32').text(mmUstep32.toFixed(5));
	$('#mm_ustep_64').text(mmUstep64.toFixed(5));
	$('#mm_ustep_128').text(mmUstep128.toFixed(5));
	$('#mm_ustep_256').text(mmUstep256.toFixed(5));

	$('#max_retract_1')
		.text(maxRetract1.toFixed(1))
		.addClass(maxRetract1 >= retractionSpeed ? 'text-success' : 'text-danger')
		.removeClass(maxRetract1 < retractionSpeed ? 'text-success' : 'text-danger');
	$('#max_retract_2')
		.text(maxRetract2.toFixed(1))
		.addClass(maxRetract2 >= retractionSpeed ? 'text-success' : 'text-danger')
		.removeClass(maxRetract2 < retractionSpeed ? 'text-success' : 'text-danger');
	$('#max_retract_4')
		.text(maxRetract4.toFixed(1))
		.addClass(maxRetract4 >= retractionSpeed ? 'text-success' : 'text-danger')
		.removeClass(maxRetract4 < retractionSpeed ? 'text-success' : 'text-danger');
	$('#max_retract_8')
		.text(maxRetract8.toFixed(1))
		.addClass(maxRetract8 >= retractionSpeed ? 'text-success' : 'text-danger')
		.removeClass(maxRetract8 < retractionSpeed ? 'text-success' : 'text-danger');
	$('#max_retract_16')
		.text(maxRetract16.toFixed(1))
		.addClass(maxRetract16 >= retractionSpeed ? 'text-success' : 'text-danger')
		.removeClass(maxRetract16 < retractionSpeed ? 'text-success' : 'text-danger');
	$('#max_retract_32')
		.text(maxRetract32.toFixed(1))
		.addClass(maxRetract32 >= retractionSpeed ? 'text-success' : 'text-danger')
		.removeClass(maxRetract32 < retractionSpeed ? 'text-success' : 'text-danger');
	$('#max_retract_64')
		.text(maxRetract64.toFixed(1))
		.addClass(maxRetract64 >= retractionSpeed ? 'text-success' : 'text-danger')
		.removeClass(maxRetract64 < retractionSpeed ? 'text-success' : 'text-danger');
	$('#max_retract_128')
		.text(maxRetract128.toFixed(1))
		.addClass(maxRetract128 >= retractionSpeed ? 'text-success' : 'text-danger')
		.removeClass(maxRetract128 < retractionSpeed ? 'text-success' : 'text-danger');
	$('#max_retract_256')
		.text(maxRetract256.toFixed(1))
		.addClass(maxRetract256 >= retractionSpeed ? 'text-success' : 'text-danger')
		.removeClass(maxRetract256 < retractionSpeed ? 'text-success' : 'text-danger');

	$('#usteps_on_segment_1')
		.text(uStepsOnSegment1.toFixed(5))
		.addClass(uStepsOnSegment1 >= 1 ? 'text-success' : 'text-danger')
		.removeClass(uStepsOnSegment1 < 1 ? 'text-success' : 'text-danger');
	$('#usteps_on_segment_2')
		.text(uStepsOnSegment2.toFixed(5))
		.addClass(uStepsOnSegment2 >= 1 ? 'text-success' : 'text-danger')
		.removeClass(uStepsOnSegment2 < 1 ? 'text-success' : 'text-danger');
	$('#usteps_on_segment_4')
		.text(uStepsOnSegment4.toFixed(5))
		.addClass(uStepsOnSegment4 >= 1 ? 'text-success' : 'text-danger')
		.removeClass(uStepsOnSegment4 < 1 ? 'text-success' : 'text-danger');
	$('#usteps_on_segment_8')
		.text(uStepsOnSegment8.toFixed(5))
		.addClass(uStepsOnSegment8 >= 1 ? 'text-success' : 'text-danger')
		.removeClass(uStepsOnSegment8 < 1 ? 'text-success' : 'text-danger');
	$('#usteps_on_segment_16')
		.text(uStepsOnSegment16.toFixed(5))
		.addClass(uStepsOnSegment16 >= 1 ? 'text-success' : 'text-danger')
		.removeClass(uStepsOnSegment16 < 1 ? 'text-success' : 'text-danger');
	$('#usteps_on_segment_32')
		.text(uStepsOnSegment32.toFixed(5))
		.addClass(uStepsOnSegment32 >= 1 ? 'text-success' : 'text-danger')
		.removeClass(uStepsOnSegment32 < 1 ? 'text-success' : 'text-danger');
	$('#usteps_on_segment_64')
		.text(uStepsOnSegment64.toFixed(5))
		.addClass(uStepsOnSegment64 >= 1 ? 'text-success' : 'text-danger')
		.removeClass(uStepsOnSegment64 < 1 ? 'text-success' : 'text-danger');
	$('#usteps_on_segment_128')
		.text(uStepsOnSegment128.toFixed(5))
		.addClass(uStepsOnSegment128 >= 1 ? 'text-success' : 'text-danger')
		.removeClass(uStepsOnSegment128 < 1 ? 'text-success' : 'text-danger');
	$('#usteps_on_segment_256')
		.text(uStepsOnSegment256.toFixed(5))
		.addClass(uStepsOnSegment256 >= 1 ? 'text-success' : 'text-danger')
		.removeClass(uStepsOnSegment256 < 1 ? 'text-success' : 'text-danger');
}

function calcExtrusionData() {

	// Extrusion in mm³/mm
	var lineWidth = parseFloat($('#line_width').val());
	var layerHeight = parseFloat($('#layer_height').val());
	var flowRate = parseFloat($('#flow').val()) / 100.0;

	var extrusionInMM3PerMM = lineWidth * layerHeight * flowRate;

	$('#extrusion_in_mm3_mm').text(extrusionInMM3PerMM.toFixed(5));

	// Filament cross-sectional area
	var filamentDiameter = parseFloat($('#filament_diameter').val());
	var filamentRadius = filamentDiameter / 2;
	var filamentArea = (filamentRadius * filamentRadius) * Math.PI;

	$('#filament_area').text(filamentArea.toFixed(5));

	// Input-Output-Ratio
	var inputOutputRatio = extrusionInMM3PerMM / filamentArea;

	$('#input_output_ratio').text(inputOutputRatio.toFixed(5));

	// Extrusion on segement
	var segmentSize = parseFloat($('#segment_size').val());
	var extrusionOnSegment = segmentSize * inputOutputRatio;

	$('#extrusion_on_segment').text(extrusionOnSegment.toFixed(5)).trigger('change');
}

