(function(ustepCalculator, $, undefined) {
	const	steps      = [   1,   2,   4,   8, 16, 32, 64, 128, 256],
			multiplier = [1/16, 1/8, 1/4, 1/2,  1,  2,  4,   8,  16];

	// Defaults
	let lineWidth       = 0.4,
		layerHeight     = 0.2,
		flowRate        = 1,
		segmentSize     = 0.2,
		extruderSteps16 = 415,
		stepRate        = 200 * 1000,
		retractionSpeed = 1800,
		filamentArea        = (1.75/2 * 1.75/2) * Math.PI,
		extrusionInMM3PerMM = lineWidth * layerHeight * flowRate,
		inputOutputRatio    = extrusionInMM3PerMM / filamentArea,
		extrusionOnSegment  = segmentSize * inputOutputRatio;

	let calcUStepsTable = function() {
		for (let i = 0; i < steps.length; i++) {
			let extruderSteps     = (extruderSteps16 * multiplier[i])
				mmUstep           = (1 / extruderSteps),
				shortestMove      = (mmUstep / inputOutputRatio),
				maxRetract        = ((stepRate / extruderSteps) * 60),
				maxRetractOK      = (maxRetract >= retractionSpeed),
				uStepsOnSegment   = (extrusionOnSegment / mmUstep),
				uStepsOnSegmentOK = (uStepsOnSegment >= 1);

			$('#steps_mm_' + steps[i]).text(extruderSteps.toFixed(3));

			$('#mm_ustep_' + steps[i]).text(mmUstep.toFixed(5));

			$('#shortest_move_' + steps[i]).text(shortestMove.toFixed(5));

			$('#max_retract_' + steps[i])
				.text(maxRetract.toFixed(1))
				.toggleClass('text-success', maxRetractOK)
				.toggleClass('text-danger',  !maxRetractOK);

			$('#usteps_on_segment_' + steps[i])
				.text(uStepsOnSegment.toFixed(5))
				.toggleClass('text-success', uStepsOnSegmentOK)
				.toggleClass('text-danger',  !uStepsOnSegmentOK);
		}
	};

	let calcExtrusionInMM3PerMM = function() {
		extrusionInMM3PerMM = lineWidth * layerHeight * flowRate;

		calcInputOutputRatio();
	};

	let calcFilamentArea = function(filamentRadius) {
		filamentArea = (filamentRadius * filamentRadius) * Math.PI;

		calcInputOutputRatio();
	};

	let calcInputOutputRatio = function() {
		inputOutputRatio = extrusionInMM3PerMM / filamentArea;

		calcExtrusionOnSegment();
	};

	let calcExtrusionOnSegment = function() {
		extrusionOnSegment = segmentSize * inputOutputRatio;

		calcUStepsTable();
	};

	let registerChangeHandlers = function() {
		$('#line_width').change(function() {
			lineWidth = this.valueAsNumber;
			calcExtrusionInMM3PerMM();
		});
		$('#layer_height').change(function() {
			layerHeight = this.valueAsNumber;
			calcExtrusionInMM3PerMM();
		});
		$('#flow').change(function() {
			flowRate = this.valueAsNumber / 100.0;
			calcExtrusionInMM3PerMM();
		});
		$('#filament_diameter').change(function() {
			let filamentRadius = this.valueAsNumber / 2.0;
			calcFilamentArea(filamentRadius);
		});
		$('#segment_size').change(function() {
			segmentSize = this.valueAsNumber;
			calcExtrusionOnSegment();
		});

		$('#extruder_steps').change(function() {
			extruderSteps16 = this.valueAsNumber;
			calcUStepsTable();
		});
		$('#retraction_speed').change(function() {
			retractionSpeed = this.valueAsNumber;
			calcUStepsTable();
		});
		$('#step_rate').change(function() {
			stepRate = this.valueAsNumber * 1000;
			calcUStepsTable();
		});
	};

	ustepCalculator.init = function() {
		registerChangeHandlers();
		calcUStepsTable();
	}
}(window.ustepCalculator = window.ustepCalculator || {}, jQuery));

$(document).ready(function() {
	ustepCalculator.init();
});
